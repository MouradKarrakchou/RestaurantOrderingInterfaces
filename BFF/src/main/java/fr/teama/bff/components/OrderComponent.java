package fr.teama.bff.components;

import fr.teama.bff.connectors.externalDTO.*;
import fr.teama.bff.controllers.dto.KioskItemDTO;
import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.entities.TableOrderInformation;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.NoAvailableTableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IOrderComponent;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Component
public class OrderComponent implements IOrderComponent {
    @Autowired
    private IDiningProxy diningProxy;

    @Override
    public List<TableDTO> availableTables() throws DiningServiceUnavaibleException {
        return diningProxy.getAllTable().stream()
                .filter(tableDTO -> !tableDTO.isTaken())
                .toList();
    }

    @Override
    public TableOrderInformation processOrder(KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException {
        List<TableDTO> availableTables = availableTables();
        if (availableTables.isEmpty()){
            throw new NoAvailableTableException();
        }

        TableDTO table = availableTables.get(0);
        TableOrderDTO tableOrderDTO = diningProxy.openTable(table.getNumber());
        for (KioskItemDTO kioskItemDTO : kioskOrderDTO.getItems()) {
            diningProxy.addToTableOrder(tableOrderDTO.getId(), new ItemDTO(kioskItemDTO));
        }
        List<PreparationDTO> preparationDTOList = diningProxy.prepare(tableOrderDTO.getId());
        diningProxy.bill(tableOrderDTO.getId());
        LocalDateTime shouldBeReadyAt = getShouldBeReadyAt(preparationDTOList);
        return new TableOrderInformation(tableOrderDTO.getId(), shouldBeReadyAt);
    }

    private LocalDateTime getShouldBeReadyAt(List<PreparationDTO> preparationDTOList) {
        LoggerHelper.logInfo("Calculating the date when the order should be ready for :" + preparationDTOList.toString());
        LocalDateTime shouldBeReadyAt = LocalDateTime.now();
        for (PreparationDTO preparationDTO : preparationDTOList) {
            if (shouldBeReadyAt.isBefore(preparationDTO.getShouldBeReadyAt())) {
                shouldBeReadyAt = preparationDTO.getShouldBeReadyAt();
            }
        }
        return shouldBeReadyAt;
    }
}

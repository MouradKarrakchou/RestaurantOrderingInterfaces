package fr.teama.bff.components;

import fr.teama.bff.connectors.externalDTO.*;
import fr.teama.bff.controllers.dto.KioskItemDTO;
import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.NoAvailableTableException;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IOrderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class OrderComponent implements IOrderComponent {
    @Autowired
    private IDiningProxy diningProxy;

    public List<TableDTO> availableTables() throws DiningServiceUnavaibleException {
        return diningProxy.getAllTable().stream()
                .filter(tableDTO -> !tableDTO.isTaken())
                .toList();
    }

    public UUID processOrder(KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException {
        List<TableDTO> availableTables = availableTables();
        if (availableTables.isEmpty()){
            throw new NoAvailableTableException();
        }

        TableDTO table = availableTables.get(0);
        TableOrderDTO tableOrderDTO = diningProxy.openTable(table.getNumber());
        for (KioskItemDTO kioskItemDTO : kioskOrderDTO.getItems()) {
            diningProxy.addToTableOrder(tableOrderDTO.getId(), new ItemDTO(kioskItemDTO));
        }
        diningProxy.prepare(tableOrderDTO.getId());
        diningProxy.bill(tableOrderDTO.getId());
        return tableOrderDTO.getId();
    }
}

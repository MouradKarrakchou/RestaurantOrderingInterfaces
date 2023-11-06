package fr.teama.bff.components;

import fr.teama.bff.connectors.KitchenProxy;
import fr.teama.bff.connectors.externalDTO.*;
import fr.teama.bff.controllers.dto.ConnectedTableKioskOrderDTO;
import fr.teama.bff.controllers.dto.KioskItemDTO;
import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.entities.Item;
import fr.teama.bff.entities.KitchenPreparationStatus;
import fr.teama.bff.entities.Post;
import fr.teama.bff.entities.TableOrderInformation;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.KitchenServiceNoAvailableException;
import fr.teama.bff.exceptions.NoAvailableTableException;
import fr.teama.bff.exceptions.TableAlreadyTakenException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IKitchenProxy;
import fr.teama.bff.interfaces.IOrderComponent;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;

@Component
public class OrderComponent implements IOrderComponent {
    @Autowired
    private IDiningProxy diningProxy;
    @Autowired
    private IKitchenProxy kitchenProxy;

    @Override
    public List<TableDTO> availableTables() throws DiningServiceUnavaibleException {
        return diningProxy.getAllTable().stream()
                .filter(tableDTO -> !tableDTO.isTaken())
                .toList();
    }

    @Override
    public void bill(Long tableNumber) throws DiningServiceUnavaibleException {
        TableDTO table = diningProxy.getTable(tableNumber);
        diningProxy.bill(table.getTableOrderId());
    }

    @Override
    public TableOrderInformation processKioskOrder(KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException {
        List<TableDTO> availableTables = availableTables();
        if (availableTables.isEmpty()){
            throw new NoAvailableTableException();
        }
        TableDTO table = availableTables.get(0);
        return processOrder(table, kioskOrderDTO.getItems(), true);
    }

    @Override
    public TableOrderInformation processConnectedTableOrder(ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException, TableAlreadyTakenException {
        TableDTO table = diningProxy.getTable(connectedTableKioskOrderDTO.getTableNumber());
        if (table.isTaken()) {
            throw new TableAlreadyTakenException();
        }
        return processOrder(table, connectedTableKioskOrderDTO.getItems(), false);
    }

    public TableOrderInformation continueProcessingOrder(ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException {
        TableDTO table = diningProxy.getTable(connectedTableKioskOrderDTO.getTableNumber());
        for (KioskItemDTO kioskItemDTO : connectedTableKioskOrderDTO.getItems()) {
            diningProxy.addToTableOrder(table.getTableOrderId(), new ItemDTO(kioskItemDTO));
        }
        List<Preparation> preparationDTOList = diningProxy.prepare(table.getTableOrderId());
        LocalDateTime shouldBeReadyAt = getShouldBeReadyAt(preparationDTOList);
        return new TableOrderInformation(table.getTableOrderId(), shouldBeReadyAt);
    }

    // methode to get preparation status
    public List<KitchenPreparationStatus> getTableOrderKitchenPreparation(Long tableNumber) throws KitchenServiceNoAvailableException, DiningServiceUnavaibleException {
        UUID tableOrderId = diningProxy.getTable(tableNumber).getTableOrderId();
        List<KitchenPreparationStatus> kitchenPreparationStatusList = new ArrayList<>();
        List<KitchenPreparation> kitchenPreparationList = kitchenProxy.getTableOrderKitchenPreparation(tableOrderId);
        for (KitchenPreparation kitchenPreparation : kitchenPreparationList) {
            Map<String, Integer> map = new HashMap<>();
            Post post = null;
            for (KitchenItem preparedItem : kitchenPreparation.getPreparedItems()) {
                if (post == null) {
                    post = kitchenProxy.getRecipe(preparedItem.getId()).getPost();
                }
                if (map.containsKey(preparedItem.getShortName())) {
                    map.put(preparedItem.getShortName(), map.get(preparedItem.getShortName()) + 1);
                } else {
                    map.put(preparedItem.getShortName(), 1);
                }
            }
            KitchenPreparationStatus kitchenPreparationStatus = new KitchenPreparationStatus(kitchenPreparation.getId(),
                    kitchenPreparation.getCompletedAt(),
                    kitchenPreparation.getTakenForServiceAt(),
                    post);
            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                kitchenPreparationStatus.getPreparedItems().add(new Item(entry.getKey(), entry.getValue()));
            }
            kitchenPreparationStatusList.add(kitchenPreparationStatus);
        }
        return kitchenPreparationStatusList;
    }


    private TableOrderInformation processOrder(TableDTO table, List<KioskItemDTO> kioskItemDTOList, boolean bill) throws DiningServiceUnavaibleException {
        TableOrder tableOrderDTO = diningProxy.openTable(table.getNumber());
        for (KioskItemDTO kioskItemDTO : kioskItemDTOList) {
            diningProxy.addToTableOrder(tableOrderDTO.getId(), new ItemDTO(kioskItemDTO));
        }
        List<Preparation> preparationDTOList = diningProxy.prepare(tableOrderDTO.getId());
        if (bill) {
            diningProxy.bill(tableOrderDTO.getId());
        }
        LocalDateTime shouldBeReadyAt = getShouldBeReadyAt(preparationDTOList);
        return new TableOrderInformation(tableOrderDTO.getId(), shouldBeReadyAt);
    }

    private LocalDateTime getShouldBeReadyAt(List<Preparation> preparationDTOList) {
        LoggerHelper.logInfo("Calculating the date when the order should be ready for :" + preparationDTOList.toString());
        LocalDateTime shouldBeReadyAt = LocalDateTime.now(ZoneOffset.UTC); // Convert to UTC because the date in the back end is in UTC
        for (Preparation preparationDTO : preparationDTOList) {
            if (shouldBeReadyAt.isBefore(preparationDTO.getShouldBeReadyAt())) {
                shouldBeReadyAt = preparationDTO.getShouldBeReadyAt();
            }
        }
        shouldBeReadyAt = shouldBeReadyAt.plusHours(2); // Convert to UTC+2
        LoggerHelper.logInfo("Table order should be ready at :" + shouldBeReadyAt);
        return shouldBeReadyAt;
    }
}

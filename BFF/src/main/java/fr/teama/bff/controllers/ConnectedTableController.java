package fr.teama.bff.controllers;

import fr.teama.bff.components.OrderComponent;
import fr.teama.bff.connectors.DiningProxy;
import fr.teama.bff.connectors.externalDTO.KitchenPreparation;
import fr.teama.bff.connectors.externalDTO.TableDTO;
import fr.teama.bff.controllers.dto.ConnectedTableKioskOrderDTO;
import fr.teama.bff.entities.KitchenPreparationStatus;
import fr.teama.bff.entities.TableOrderInformation;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.KitchenServiceNoAvailableException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.exceptions.TableAlreadyTakenException;
import fr.teama.bff.helpers.LoggerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = ConnectedTableController.BASE_URI, produces = APPLICATION_JSON_VALUE)
public class ConnectedTableController {
    public static final String BASE_URI = "/api/connected-table";

    @Autowired
    OrderComponent orderComponent;

    @Autowired
    DiningProxy diningProxy;

    @PostMapping("/order")
    public ResponseEntity<TableOrderInformation> startProcessingOrder(@RequestBody ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException, TableAlreadyTakenException {
        LoggerHelper.logInfo("Processing order request for " + connectedTableKioskOrderDTO.toString());
        TableDTO table = diningProxy.getTable(connectedTableKioskOrderDTO.getTableNumber());
        TableOrderInformation tableOrderInformation;
        if (table.isTaken()) {
            tableOrderInformation = orderComponent.continueProcessingOrder(connectedTableKioskOrderDTO);
        } else {
            tableOrderInformation = orderComponent.processConnectedTableOrder(connectedTableKioskOrderDTO);
        }
        return ResponseEntity.ok(tableOrderInformation);
    }

    @PostMapping("/continue-order")
    public ResponseEntity<TableOrderInformation> continueOrdering(@RequestBody ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException, TableAlreadyTakenException {
        LoggerHelper.logInfo("Processing order request for " + connectedTableKioskOrderDTO.toString());
        TableOrderInformation tableOrderInformation = orderComponent.continueProcessingOrder(connectedTableKioskOrderDTO);
        return ResponseEntity.ok(tableOrderInformation);
    }


    @GetMapping("status/{tableNumber}")
    public ResponseEntity<List<KitchenPreparationStatus>> getPreparationsStatus(@PathVariable("tableNumber") Long tableNumber) throws KitchenServiceNoAvailableException, DiningServiceUnavaibleException, OrderServiceUnavailableException {
        LoggerHelper.logInfo("Getting preparations status for table " + tableNumber);
        List<KitchenPreparationStatus> kitchenPreparationStatus = orderComponent.getTableOrderKitchenPreparation(tableNumber);
        return ResponseEntity.ok(kitchenPreparationStatus);
    }

    @PostMapping("/bill")
    public void bill(@RequestBody Long tableNumber) throws DiningServiceUnavaibleException {
        LoggerHelper.logInfo("Bill request for table " + tableNumber);
        orderComponent.bill(tableNumber);
    }
}

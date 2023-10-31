package fr.teama.bff.controllers;

import fr.teama.bff.components.OrderComponent;
import fr.teama.bff.connectors.externalDTO.KitchenPreparation;
import fr.teama.bff.controllers.dto.ConnectedTableKioskOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.KitchenServiceNoAvailableException;
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

    @PostMapping("/order")
    public void startProcessingOrder(@RequestBody ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException, TableAlreadyTakenException {
        LoggerHelper.logInfo("Processing order request for " + connectedTableKioskOrderDTO.toString());
        orderComponent.processConnectedTableOrder(connectedTableKioskOrderDTO);
    }

    @PostMapping("/continue-order")
    public void continueOrdering(@RequestBody ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException, TableAlreadyTakenException {
        LoggerHelper.logInfo("Processing order request for " + connectedTableKioskOrderDTO.toString());
        orderComponent.processConnectedTableOrder(connectedTableKioskOrderDTO);
    }


    @GetMapping("status/{tableOrderId}")
    public ResponseEntity<List<KitchenPreparation>> getPreparationsStatus(@PathVariable("tableOrderId") UUID tableOrderId) throws KitchenServiceNoAvailableException {
        LoggerHelper.logInfo("Getting preparations status for table order id " + tableOrderId);
        List<KitchenPreparation> kitchenPreparations = orderComponent.getTableOrderKitchenPreparation(tableOrderId);
        return ResponseEntity.ok(kitchenPreparations);
    }

    @PostMapping("/bill")
    public void bill(@RequestBody Long tableNumber) throws DiningServiceUnavaibleException {
        LoggerHelper.logInfo("Bill request for table " + tableNumber);
        orderComponent.bill(tableNumber);
    }
}

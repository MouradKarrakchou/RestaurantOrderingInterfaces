package fr.teama.bff.controllers;

import fr.teama.bff.components.OrderComponent;
import fr.teama.bff.controllers.dto.ConnectedTableKioskOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.TableAlreadyTakenException;
import fr.teama.bff.helpers.LoggerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/bill")
    public void bill(@RequestBody Long tableNumber) throws DiningServiceUnavaibleException {
        LoggerHelper.logInfo("Bill request for table " + tableNumber);
        orderComponent.bill(tableNumber);
    }
}

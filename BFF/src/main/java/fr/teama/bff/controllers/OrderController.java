package fr.teama.bff.controllers;


import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.NoAvailableTableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IOrderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = OrderController.BASE_URI, produces = APPLICATION_JSON_VALUE)
public class OrderController {
    public static final String BASE_URI = "/api/order";

    @Autowired
    private IOrderComponent orderComponent;

    @PostMapping
    public ResponseEntity<UUID> processOrder(@RequestBody KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException {
        LoggerHelper.logInfo("Processing order request for " + kioskOrderDTO.toString());
        if (kioskOrderDTO.getItems() == null) {
            LoggerHelper.logError("Order request with null items");
            return ResponseEntity.badRequest().build();
        }
        UUID orderId = orderComponent.processOrder(kioskOrderDTO);
        LoggerHelper.logInfo("Order processed with id " + orderId.toString());
        return ResponseEntity.ok(orderId);
    }
}

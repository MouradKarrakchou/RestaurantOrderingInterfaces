package fr.teama.bff.controllers;


import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.controllers.dto.OrderInformationDTO;
import fr.teama.bff.entities.TableOrderInformation;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.NoAvailableTableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IOrderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = OrderController.BASE_URI, produces = APPLICATION_JSON_VALUE)
public class OrderController {
    private final Map<Long, UUID> orderIdLinkWithTableOrderId = new HashMap<>();
    private long nextOrderId = 1;

    public static final String BASE_URI = "/api/order";

    @Autowired
    private IOrderComponent orderComponent;

    @PostMapping
    public ResponseEntity<OrderInformationDTO> processOrder(@RequestBody KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException {
        LoggerHelper.logInfo("Processing order request for " + kioskOrderDTO.toString());
        if (kioskOrderDTO.getItems() == null || kioskOrderDTO.getItems().isEmpty()) {
            LoggerHelper.logError("Order request with no items");
            return ResponseEntity.badRequest().build();
        }
        TableOrderInformation tableOrderInformation = orderComponent.processOrder(kioskOrderDTO);
        LoggerHelper.logInfo("Order processed with table order id " + tableOrderInformation.getTableOrderId().toString());
        orderIdLinkWithTableOrderId.put(nextOrderId, tableOrderInformation.getTableOrderId());
        OrderInformationDTO orderInformationDTO = new OrderInformationDTO(tableOrderInformation.getTableOrderId(), nextOrderId, tableOrderInformation.getShouldBeReadyAt());
        LoggerHelper.logInfo("Order information returned : " + orderInformationDTO);
        nextOrderId++;
        return ResponseEntity.ok(orderInformationDTO);
    }

    @PostMapping("/table-order-id")
    public ResponseEntity<UUID> getTableOrderIdFromOrderId(long orderId) {
        LoggerHelper.logInfo("Getting table order id for order id " + orderId);
        UUID tableOrderId = orderIdLinkWithTableOrderId.get(orderId);
        if (tableOrderId == null) {
            LoggerHelper.logError("No table order id found for order id " + orderId);
            return ResponseEntity.notFound().build();
        }
        LoggerHelper.logInfo("Table order id found for order id " + orderId + " : " + tableOrderId.toString());
        return ResponseEntity.ok(tableOrderId);
    }

    @PostMapping("/reset-order-id")
    public ResponseEntity<Void> resetOrderId() {
        LoggerHelper.logInfo("Resetting order id");
        orderIdLinkWithTableOrderId.clear();
        nextOrderId = 1;
        return ResponseEntity.ok().build();
    }
}

package fr.teama.bff.controllers;


import fr.teama.bff.BffApplication;
import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.entities.KioskOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = PreferenceController.BASE_URI, produces = APPLICATION_JSON_VALUE)
public class OrderController {
    public static final String BASE_URI = "/api/order";

    @PostMapping
    public ResponseEntity<String> processOrder(KioskOrderDTO kioskOrderDTO) {
        // return command number and process order
        KioskOrder kioskOrder = new KioskOrder(kioskOrderDTO);
        BffApplication.kioskOrderList.add(kioskOrder);
        return ResponseEntity.ok("Order processed");
    }
}

package fr.teama.bff.controllers;


import fr.teama.bff.connectors.MenuProxy;
import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.entities.OrderingItem;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IPreferenceComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = PreferenceController.BASE_URI, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
public class PreferenceController {
    public static final String BASE_URI = "/api/preference";
    @Autowired
    IPreferenceComponent preferenceComponent;
    @Autowired
    MenuProxy menuProxy;

    @PostMapping
    public ResponseEntity<List<MenuItem>> retriveMostSoldItems() throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        LoggerHelper.logInfo("The mission has started");
        List<OrderingItem> mostSoldItems = preferenceComponent.retrieveMostSoldItems(3);
        List<MenuItem> menuItems= new ArrayList<>();
        for (OrderingItem orderingItem: mostSoldItems) {
            menuItems.add(menuProxy.findByID(orderingItem.getId()));
        }
        return ResponseEntity.ok(menuItems);
    }

}
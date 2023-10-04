package fr.teama.bff.controllers;


import fr.teama.bff.connectors.MenuProxy;
import fr.teama.bff.entities.Category;
import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IPreferenceComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = PreferenceController.BASE_URI, produces = APPLICATION_JSON_VALUE)
public class PreferenceController {
    public static final String BASE_URI = "/api/preference";
    @Autowired
    IPreferenceComponent preferenceComponent;

    @GetMapping
    public ResponseEntity<List<MenuItem>> retriveMostSoldItems() throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        LoggerHelper.logInfo("Finding most sold items");
        List<MenuItem> menuItems = preferenceComponent.retrieveMostSoldItems(3);
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/by-category")
    public ResponseEntity<HashMap<Category, MenuItem>> retriveMostSoldItemsByCategory() throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        LoggerHelper.logInfo("Finding most sold items by category");
        HashMap<Category, MenuItem> menuItems = preferenceComponent.retrieveMostSoldByCategories();
        return ResponseEntity.ok(menuItems);
    }

}
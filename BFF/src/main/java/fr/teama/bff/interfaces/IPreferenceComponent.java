package fr.teama.bff.interfaces;


import fr.teama.bff.entities.Category;
import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;

import java.util.HashMap;
import java.util.List;

public interface IPreferenceComponent {


    List<MenuItem> retrieveMostSoldItems(int numberOfEntries) throws DiningServiceUnavaibleException, OrderServiceUnavailableException;
    HashMap<Category, MenuItem> retrieveMostSoldByCategories() throws DiningServiceUnavaibleException, OrderServiceUnavailableException;


    }

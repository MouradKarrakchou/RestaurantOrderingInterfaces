package fr.teama.bff.interfaces;

import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;

import java.util.List;

public interface IMenuProxy {

    MenuItem findByID(String id) throws OrderServiceUnavailableException;

    List<MenuItem> findAllMenuItems() throws OrderServiceUnavailableException;
}

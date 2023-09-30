package fr.teama.bff.interfaces;

import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;

public interface IMenuProxy {

    MenuItem findByID(String id) throws OrderServiceUnavailableException;
}

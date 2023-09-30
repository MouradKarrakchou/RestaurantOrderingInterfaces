package fr.teama.bff.interfaces;

import fr.teama.bff.entities.TableOrder;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;

import java.util.List;

public interface IDiningProxy {
    List<TableOrder> getAllTableOrders() throws DiningServiceUnavaibleException;

}

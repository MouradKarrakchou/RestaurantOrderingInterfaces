package fr.teama.bff.interfaces;

import fr.teama.bff.entities.Table;
import fr.teama.bff.entities.TableOrder;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;

import java.util.List;

public interface IDiningProxy {
    List<TableOrder> getAllTableOrders() throws DiningServiceUnavaibleException;

    List<Table> getAllTable() throws DiningServiceUnavaibleException;
}

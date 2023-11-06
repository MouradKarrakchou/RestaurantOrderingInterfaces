package fr.teama.bff.interfaces;

import fr.teama.bff.connectors.externalDTO.*;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

public interface IDiningProxy {
    List<TableOrder> getAllTableOrders() throws DiningServiceUnavaibleException;
    List<TableDTO> getAllTable() throws DiningServiceUnavaibleException;
    TableDTO getTable(Long tableNumber) throws DiningServiceUnavaibleException;
    TableOrder openTable(Long tableId) throws DiningServiceUnavaibleException;
    TableOrder tableOrder(UUID tableOrderId) throws DiningServiceUnavaibleException;
    TableOrder addToTableOrder(UUID tableOrderId, ItemDTO itemDTO) throws DiningServiceUnavaibleException;
    List<Preparation> prepare(@PathVariable("tableOrderId") UUID tableOrderId) throws DiningServiceUnavaibleException;
    TableOrder bill(@PathVariable("tableOrderId") UUID tableOrderId) throws DiningServiceUnavaibleException;
}

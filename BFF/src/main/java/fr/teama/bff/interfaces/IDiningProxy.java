package fr.teama.bff.interfaces;

import fr.teama.bff.connectors.externalDTO.*;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

public interface IDiningProxy {
    List<TableOrderDTO> getAllTableOrders() throws DiningServiceUnavaibleException;

    List<TableDTO> getAllTable() throws DiningServiceUnavaibleException;

    TableOrderDTO openTable(Long tableId) throws DiningServiceUnavaibleException;

    TableOrderDTO tableOrder(UUID tableOrderId) throws DiningServiceUnavaibleException;

    TableOrderDTO addToTableOrder(UUID tableOrderId, ItemDTO itemDTO) throws DiningServiceUnavaibleException;

    List<PreparationDTO> prepare(@PathVariable("tableOrderId") UUID tableOrderId) throws DiningServiceUnavaibleException;

    TableOrderDTO bill(@PathVariable("tableOrderId") UUID tableOrderId) throws DiningServiceUnavaibleException;
}

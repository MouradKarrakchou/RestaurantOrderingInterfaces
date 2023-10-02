package fr.teama.bff.interfaces;

import fr.teama.bff.connectors.externalDTO.TableDTO;
import fr.teama.bff.connectors.externalDTO.TableOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;

import java.util.List;

public interface IDiningProxy {
    List<TableOrderDTO> getAllTableOrders() throws DiningServiceUnavaibleException;

    List<TableDTO> getAllTable() throws DiningServiceUnavaibleException;

    TableOrderDTO openTable(Long tableId) throws DiningServiceUnavaibleException;
}

package fr.teama.bff.interfaces;

import fr.teama.bff.connectors.externalDTO.TableDTO;
import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.entities.TableOrderInformation;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.NoAvailableTableException;

import java.util.List;
import java.util.UUID;

public interface IOrderComponent {
    TableOrderInformation processOrder(KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException;

    List<TableDTO> availableTables() throws DiningServiceUnavaibleException;
}

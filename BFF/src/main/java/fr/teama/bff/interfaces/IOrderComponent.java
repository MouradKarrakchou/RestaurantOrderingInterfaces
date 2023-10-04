package fr.teama.bff.interfaces;

import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.NoAvailableTableException;

import java.util.UUID;

public interface IOrderComponent {
    UUID processOrder(KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException;
}

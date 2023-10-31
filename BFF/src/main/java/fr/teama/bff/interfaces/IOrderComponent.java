package fr.teama.bff.interfaces;

import fr.teama.bff.connectors.externalDTO.KitchenPreparation;
import fr.teama.bff.connectors.externalDTO.TableDTO;
import fr.teama.bff.controllers.dto.ConnectedTableKioskOrderDTO;
import fr.teama.bff.controllers.dto.KioskOrderDTO;
import fr.teama.bff.entities.TableOrderInformation;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.KitchenServiceNoAvailableException;
import fr.teama.bff.exceptions.NoAvailableTableException;
import fr.teama.bff.exceptions.TableAlreadyTakenException;

import java.util.List;
import java.util.UUID;

public interface IOrderComponent {
    TableOrderInformation processConnectedTableOrder(ConnectedTableKioskOrderDTO connectedTableKioskOrderDTO) throws DiningServiceUnavaibleException, TableAlreadyTakenException;
    TableOrderInformation processKioskOrder(KioskOrderDTO kioskOrderDTO) throws DiningServiceUnavaibleException, NoAvailableTableException;
    List<TableDTO> availableTables() throws DiningServiceUnavaibleException;
    void bill(Long tableNumber) throws DiningServiceUnavaibleException;
    List<KitchenPreparation> getTableOrderKitchenPreparation(UUID tableOrderId) throws KitchenServiceNoAvailableException;
}

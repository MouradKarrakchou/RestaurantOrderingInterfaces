package fr.teama.bff.interfaces;

import fr.teama.bff.connectors.externalDTO.KitchenPreparation;
import fr.teama.bff.entities.Recipe;
import fr.teama.bff.exceptions.KitchenServiceNoAvailableException;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

public interface IKitchenProxy {
    List<KitchenPreparation> getTableOrderKitchenPreparation(@PathVariable("tableOrderId") UUID tableOrderId) throws KitchenServiceNoAvailableException;
    Recipe getRecipe(UUID itemId) throws KitchenServiceNoAvailableException;
    void startCook(UUID itemId) throws KitchenServiceNoAvailableException;
    void finishCook(UUID itemId) throws KitchenServiceNoAvailableException;
    void takeToTablePreparation(UUID preparationId) throws KitchenServiceNoAvailableException;
}

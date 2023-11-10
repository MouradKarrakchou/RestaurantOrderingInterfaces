package fr.teama.bff.connectors;

import fr.teama.bff.components.OrderComponent;
import fr.teama.bff.connectors.externalDTO.KitchenPreparation;
import fr.teama.bff.connectors.externalDTO.Preparation;
import fr.teama.bff.connectors.externalDTO.TableOrder;
import fr.teama.bff.entities.Recipe;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.KitchenServiceNoAvailableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IKitchenProxy;
import fr.teama.bff.interfaces.IOrderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Component
public class KitchenProxy implements IKitchenProxy {
    @Value("${kitchen.host.baseurl}")
    private String apiBaseUrlHostAndPort;
    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    IDiningProxy diningProxy;

    @Override
    public List<KitchenPreparation> getTableOrderKitchenPreparation(UUID tableOrderId) throws KitchenServiceNoAvailableException {
        try {
            LoggerHelper.logInfo("Ask Dining service to get all kitchen preparations table order");
            TableOrder tableOrder = diningProxy.tableOrder(tableOrderId);
            List<KitchenPreparation> kitchenPreparations = new ArrayList<>();
            if (tableOrder.getPreparations() == null) {
                return kitchenPreparations;
            }
            for (Preparation preparation : tableOrder.getPreparations()) {
                KitchenPreparation kitchenPreparationDTO = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/preparations/" + preparation.getId(), KitchenPreparation.class).getBody();
                if (kitchenPreparationDTO != null) {
                    kitchenPreparations.add(kitchenPreparationDTO);
                }
            }
            return kitchenPreparations;
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new KitchenServiceNoAvailableException();
        }
    }

    @Override
    public Recipe getRecipe(UUID itemId) throws KitchenServiceNoAvailableException {
        try {
            LoggerHelper.logInfo("Ask Kitchen service for recipe " + itemId);
            return restTemplate.getForEntity(apiBaseUrlHostAndPort + "/preparedItems/" + itemId + "/recipe", Recipe.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new KitchenServiceNoAvailableException();
        }
    }
}

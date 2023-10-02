package fr.teama.bff.connectors;

import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IMenuProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class MenuProxy implements IMenuProxy {
    @Value("${menu.host.baseurl}")
    private String apiBaseUrlHostAndPort;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public MenuItem findByID(String id) throws OrderServiceUnavailableException {
        try {
            LoggerHelper.logInfo("Ask Menu service for the item with id:"+ id);
            return restTemplate.getForEntity(apiBaseUrlHostAndPort+"/menus/"+id, MenuItem.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new OrderServiceUnavailableException();
        }
    }
}

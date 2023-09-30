package fr.teama.bff.connectors;

import fr.teama.bff.entities.TableOrder;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IDiningProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class DiningProxy implements IDiningProxy {
    @Value("${dining.host.baseurl}")
    private String apiBaseUrlHostAndPort;
    private final RestTemplate restTemplate = new RestTemplate();
    @Override
    public List<TableOrder> getAllTableOrders() throws  DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Notify mission-service that the mission that the Payload has been dropped.");
            TableOrder[] tables = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/tableOrders", TableOrder[].class).getBody();
            List<TableOrder> tablesOrders = Stream.of(tables).toList();
            return tablesOrders;
        } catch (Exception e) {
            throw e;
            //LoggerHelper.logError(e.toString());
            //throw new DiningServiceUnavaibleException();
        }
    }

}

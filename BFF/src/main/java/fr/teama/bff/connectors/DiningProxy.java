package fr.teama.bff.connectors;

import fr.teama.bff.entities.Table;
import fr.teama.bff.entities.TableOrder;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IDiningProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Stream;

@Component
public class DiningProxy implements IDiningProxy {
    @Value("${dining.host.baseurl}")
    private String apiBaseUrlHostAndPort;
    private final RestTemplate restTemplate = new RestTemplate();
    @Override
    public List<TableOrder> getAllTableOrders() throws  DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service for all tableOrders");
            TableOrder[] tableOrders = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/tableOrders", TableOrder[].class).getBody();
            List<TableOrder> tablesOrders = Stream.of(tableOrders).toList();
            return tablesOrders;
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public List<Table> getAllTable() throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Notify mission-service that the mission that the Payload has been dropped.");
            Table[] tables = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/tables", Table[].class).getBody();
            List<Table> tablesOrders = Stream.of(tables).toList();
            return tablesOrders;
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

}

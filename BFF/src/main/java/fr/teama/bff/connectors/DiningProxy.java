package fr.teama.bff.connectors;

import fr.teama.bff.connectors.externalDTO.TableDTO;
import fr.teama.bff.connectors.externalDTO.TableOrderDTO;
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
    public List<TableOrderDTO> getAllTableOrders() throws  DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service for all tableOrders");
            TableOrderDTO[] tableOrderDTOS = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/tableOrders", TableOrderDTO[].class).getBody();
            List<TableOrderDTO> tablesOrders = Stream.of(tableOrderDTOS).toList();
            return tablesOrders;
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public List<TableDTO> getAllTable() throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service for all tables");
            TableDTO[] tableDTOS = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/tables", TableDTO[].class).getBody();
            List<TableDTO> tablesOrders = Stream.of(tableDTOS).toList();
            return tablesOrders;
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public TableOrderDTO openTable(Long tableId) throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service to open a table");
            TableOrderDTO tableOrderDTO = restTemplate.getForEntity(apiBaseUrlHostAndPort +"/tables", TableOrderDTO.class).getBody();
            return tableOrderDTO;
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }
}

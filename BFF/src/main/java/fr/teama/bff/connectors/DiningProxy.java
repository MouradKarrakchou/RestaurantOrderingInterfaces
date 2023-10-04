package fr.teama.bff.connectors;

import fr.teama.bff.connectors.externalDTO.*;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IDiningProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.time.Period;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Component
public class DiningProxy implements IDiningProxy {
    @Value("${dining.host.baseurl}")
    private String apiBaseUrlHostAndPort;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<TableOrderDTO> getAllTableOrders() throws  DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service to get all tableOrders");
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
            StartOrderingDTO startOrderingDTO = new StartOrderingDTO(tableId, 1);
            return restTemplate.postForEntity(apiBaseUrlHostAndPort + "/tableOrders", startOrderingDTO, TableOrderDTO.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public TableOrderDTO tableOrder(UUID tableOrderId) throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service to get a table order");
            return restTemplate.getForEntity(apiBaseUrlHostAndPort + "/tableOrders" + tableOrderId, TableOrderDTO.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public TableOrderDTO addToTableOrder(UUID tableOrderId, ItemDTO itemDTO) throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service to add an item to a table order " + itemDTO);
            return restTemplate.postForEntity(apiBaseUrlHostAndPort + "/tableOrders/" + tableOrderId, itemDTO, TableOrderDTO.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public List<PreparationDTO> prepare(UUID tableOrderId) throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service to prepare a table order");
            return (List<PreparationDTO>) restTemplate.postForEntity(apiBaseUrlHostAndPort + "/tableOrders/" + tableOrderId + "/prepare", null, List.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }

    @Override
    public TableOrderDTO bill(UUID tableOrderId) throws DiningServiceUnavaibleException {
        try {
            LoggerHelper.logInfo("Ask Dining service to bill a table order");
            return restTemplate.postForEntity(apiBaseUrlHostAndPort + "/tableOrders/" + tableOrderId + "/bill", null, TableOrderDTO.class).getBody();
        } catch (Exception e) {
            LoggerHelper.logError(e.toString());
            throw new DiningServiceUnavaibleException();
        }
    }
}

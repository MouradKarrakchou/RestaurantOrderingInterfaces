package fr.teama.bff.components;

import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.connectors.externalDTO.OrderingItemDTO;
import fr.teama.bff.connectors.externalDTO.OrderingLineDTO;
import fr.teama.bff.connectors.externalDTO.TableOrderDTO;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.interfaces.IMenuProxy;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IPreferenceComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PreferenceComponent implements IPreferenceComponent {
    @Autowired
    private IMenuProxy menuProxy;
    @Autowired
    private IDiningProxy diningProxy;

    @Cacheable("MostSoldItems")
    @Override
    public List<MenuItem> retrieveMostSoldItems(int numberOfEntries) throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        HashMap<OrderingItemDTO, Integer> hashMap=new HashMap<>();
        for (TableOrderDTO tableOrderDTO :diningProxy.getAllTableOrders()){
            for (OrderingLineDTO orderingLineDTO : tableOrderDTO.getLines()){
                OrderingItemDTO item= orderingLineDTO.getItem();
                if (hashMap.containsKey(item)) {
                    hashMap.put(item, hashMap.get(item) + orderingLineDTO.getHowMany());
                } else {
                    hashMap.put(item, orderingLineDTO.getHowMany());
                }
            }
        }
        List<Map.Entry<OrderingItemDTO, Integer>> entryList = new ArrayList<>(hashMap.entrySet());
        entryList.sort(Map.Entry.<OrderingItemDTO, Integer>comparingByValue().reversed());
        List<OrderingItemDTO> topOrderedItems = new ArrayList<>();
        for (Map.Entry<OrderingItemDTO, Integer> entry : entryList.subList(0, Math.min(numberOfEntries, entryList.size()))) {
            topOrderedItems.add(entry.getKey());
        }
        List<MenuItem> menuItems= new ArrayList<>();
        for (OrderingItemDTO orderingItemDTO : topOrderedItems) {
            menuItems.add(menuProxy.findByID(orderingItemDTO.getId()));
        }
        return menuItems;
    }
}

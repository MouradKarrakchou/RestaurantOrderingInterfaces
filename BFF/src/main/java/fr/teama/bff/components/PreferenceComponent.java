package fr.teama.bff.components;

import fr.teama.bff.connectors.externalDTO.OrderingItem;
import fr.teama.bff.connectors.externalDTO.OrderingLine;
import fr.teama.bff.connectors.externalDTO.TableOrder;
import fr.teama.bff.entities.*;
import fr.teama.bff.entities.MenuItem;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.exceptions.OrderServiceUnavailableException;
import fr.teama.bff.helpers.LoggerHelper;
import fr.teama.bff.interfaces.IMenuProxy;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IPreferenceComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.List;

@Component
public class PreferenceComponent implements IPreferenceComponent {
    @Autowired
    private IMenuProxy menuProxy;
    @Autowired
    private IDiningProxy diningProxy;

    @Cacheable("MostSoldItems")
    @Override
    public List<MenuItem> retrieveMostSoldItems(int numberOfEntries) throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        List<Map.Entry<OrderingItem, Integer>> entryList = retrieveAllItemRanking();
        LoggerHelper.logInfo("Calculating the most sold items");

        List<OrderingItem> topOrderedItems = new ArrayList<>();
        for (Map.Entry<OrderingItem, Integer> entry : entryList.subList(0, Math.min(numberOfEntries, entryList.size()))) {
            topOrderedItems.add(entry.getKey());
        }
        List<MenuItem> menuItems= new ArrayList<>();
        for (OrderingItem orderingItem: topOrderedItems) {
            menuItems.add(menuProxy.findByID(orderingItem.getId()));
        }
        return menuItems;
    }


    public HashMap<UUID,MenuItem> getMenuHashMap() throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        List<MenuItem> menuItems=menuProxy.findAllMenuItems();
        HashMap<UUID,MenuItem> hashMap=new HashMap<>();
        for (MenuItem menuItem:menuItems){
            hashMap.put(menuItem.getId(),menuItem);
        }
        return hashMap;
    }

    @Cacheable("MostSoldItemsByCategories")
    @Override
    public HashMap<Category, MenuItem> retrieveMostSoldByCategories() throws DiningServiceUnavaibleException, OrderServiceUnavailableException {
        List<Map.Entry<OrderingItem, Integer>> entryList = retrieveAllItemRanking();
        LoggerHelper.logInfo("Calculating the most sold item by category");

        HashMap<UUID,MenuItem> hashMapMenuItems= getMenuHashMap();
        HashMap<Category,ItemQuantity> hashMapCategories=new HashMap<>();
        //finding the most sold item for each category
        for (Map.Entry<OrderingItem, Integer> entry : entryList) {
            MenuItem menuItem=hashMapMenuItems.get(UUID.fromString(entry.getKey().getId()));
            Category category=menuItem.getCategory();
            if (hashMapCategories.containsKey(category)){
                ItemQuantity itemQuantity=hashMapCategories.get(category);
                if (itemQuantity.getQuantity()<entry.getValue()){
                    hashMapCategories.put(category,new ItemQuantity(menuItem,entry.getValue()));
                }
            }else{
                hashMapCategories.put(category,new ItemQuantity(menuItem,entry.getValue()));
            }
        }
        //convert the hashmap to a hashmap linking the category to the most sold item
        HashMap<Category, MenuItem> hashMap=new HashMap<>();
        for (Map.Entry<Category,ItemQuantity> entry : hashMapCategories.entrySet()) {
            hashMap.put(entry.getKey(),entry.getValue().getMenuItem());
        }
        return hashMap;
    }

    public List<Map.Entry<OrderingItem, Integer>> retrieveAllItemRanking() throws DiningServiceUnavaibleException {
        LoggerHelper.logInfo("Calculating all item ranking");

        HashMap<OrderingItem, Integer> hashMap=new HashMap<>();
        for (TableOrder tableOrder:diningProxy.getAllTableOrders()){
            for (OrderingLine orderingLine :tableOrder.getLines()){
                OrderingItem item= orderingLine.getItem();
                if (hashMap.containsKey(item)) {
                    hashMap.put(item, hashMap.get(item) + orderingLine.getHowMany());
                } else {
                    hashMap.put(item, orderingLine.getHowMany());
                }
            }
        }
        List<Map.Entry<OrderingItem, Integer>> entryList = new ArrayList<>(hashMap.entrySet());
        entryList.sort(Map.Entry.<OrderingItem, Integer>comparingByValue().reversed());
        return entryList;
    }





}

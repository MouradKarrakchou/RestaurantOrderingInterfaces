package fr.teama.bff.components;

import fr.teama.bff.entities.*;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.interfaces.IMenuProxy;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IPreferenceComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PreferenceComponent implements IPreferenceComponent {
    @Autowired
    private IMenuProxy menuProxy;
    @Autowired
    private IDiningProxy diningProxy;

    @Override
    public List<OrderingItem> retrieveMostSoldItems(int numberOfEntries) throws DiningServiceUnavaibleException {
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
        System.out.println(hashMap.toString());
        List<Map.Entry<OrderingItem, Integer>> entryList = new ArrayList<>(hashMap.entrySet());
        entryList.sort(Map.Entry.<OrderingItem, Integer>comparingByValue().reversed());
        List<OrderingItem> topOrderedItems = new ArrayList<>();
        for (Map.Entry<OrderingItem, Integer> entry : entryList.subList(0, Math.min(numberOfEntries, entryList.size()))) {
            topOrderedItems.add(entry.getKey());
        }
        return topOrderedItems;
    }
}

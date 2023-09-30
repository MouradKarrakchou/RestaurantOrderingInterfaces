package fr.teama.bff.interfaces;


import fr.teama.bff.entities.OrderingItem;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;

import java.util.List;

public interface IPreferenceComponent {


    List<OrderingItem> retrieveMostSoldItems(int numberOfEntries) throws DiningServiceUnavaibleException;
}

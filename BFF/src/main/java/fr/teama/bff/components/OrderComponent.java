package fr.teama.bff.components;

import fr.teama.bff.BffApplication;
import fr.teama.bff.entities.KioskItem;
import fr.teama.bff.entities.KioskOrder;
import fr.teama.bff.entities.Table;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IOrderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderComponent implements IOrderComponent {
    @Autowired
    private IDiningProxy diningProxy;


    public List<Table> tableOrderList() throws DiningServiceUnavaibleException {
        List<Table> tables=diningProxy.getAllTable();
        List<Table> availableTables= (List<Table>) tables.stream().filter(table -> !table.isTaken());
        BffApplication.kioskOrderList
        return null;
    }

    /**
     *
     * @param availableTables
     * @return true if tables has been filled else false
     */
    private boolean fillTables(List<Table> availableTables){
        for (KioskOrder kioskItem:BffApplication.kioskOrderList){
            if (kioskItem.getItems())
        }
    }
}

package fr.teama.bff.components;

import fr.teama.bff.BffApplication;
import fr.teama.bff.entities.KioskOrder;
import fr.teama.bff.connectors.externalDTO.TableDTO;
import fr.teama.bff.entities.Table;
import fr.teama.bff.exceptions.DiningServiceUnavaibleException;
import fr.teama.bff.interfaces.IDiningProxy;
import fr.teama.bff.interfaces.IOrderComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderComponent implements IOrderComponent {
    @Autowired
    private IDiningProxy diningProxy;


    public List<Table> availableTableList() throws DiningServiceUnavaibleException {
        List<Table> availableTables = new ArrayList<>();
        List<TableDTO> tablesDTO = diningProxy.getAllTable();
        tablesDTO.stream().filter(tableDTO -> !tableDTO.isTaken())
                .forEach(tableDTO -> availableTables.add(new Table(tableDTO.getNumber())));
        return availableTables;
    }

    /**
     *
     * @param availableTables
     * @return true if tables has been filled else false
     */
    private boolean fillTables(List<Table> availableTables){
        for (Table table : availableTables){
            if (table.isTaken())
                return false;
            if (BffApplication.kioskOrderList.isEmpty())
                return false;

            KioskOrder kioskOrder = BffApplication.kioskOrderList.poll();
            table.takeTable(kioskOrder);
        }

        return true;
    }
}

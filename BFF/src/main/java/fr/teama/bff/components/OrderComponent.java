package fr.teama.bff.components;

import fr.teama.bff.BffApplication;
import fr.teama.bff.connectors.externalDTO.ItemDTO;
import fr.teama.bff.connectors.externalDTO.OrderingLineDTO;
import fr.teama.bff.connectors.externalDTO.TableOrderDTO;
import fr.teama.bff.entities.KioskItem;
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
     * @return true if tables has been filled else false
     */
    private boolean processPendingOrders() throws DiningServiceUnavaibleException {
        // Get all available tables
        List<Table> availableTables = availableTableList();
        for (Table table : availableTables){
            if (table.isTaken())
                return false;
            if (BffApplication.kioskOrderList.isEmpty())
                return false;

            KioskOrder kioskOrder = BffApplication.kioskOrderList.poll();
            table.takeTable(kioskOrder);

            // open table and add items to back end table order
            TableOrderDTO tableOrderDTO = diningProxy.openTable(table.getNumber());
            for (OrderingLineDTO orderingLineDTO : tableOrderDTO.getLines()) {
                diningProxy.addToTableOrder(tableOrderDTO.getId(), new ItemDTO(orderingLineDTO));
            }
            diningProxy.prepare(tableOrderDTO.getId());
            diningProxy.bill(tableOrderDTO.getId());
        }

        return true;
    }

    /**
     * Check for all table if one has all his order lines prepared for free the table
     */
    private void checkForPreparedOrder(Long tableNumber) throws DiningServiceUnavaibleException {
        Table table = new Table(tableNumber);
        TableOrderDTO tableOrderDTO = diningProxy.tableOrder(table.getOrder().getOrderNumber());
        if (tableOrderDTO.isPrepared()){
            table.freeTable();
        }
    }

}

package fr.teama.bff.controllers.dto;

import java.util.List;

public class ConnectedTableKioskOrderDTO {
    private Long tableNumber;
    private List<KioskItemDTO> items;

    public ConnectedTableKioskOrderDTO() {
    }

    @Override
    public String toString() {
        return "ConnectedTableKioskOrderDTO{" +
                "tableNumber=" + tableNumber +
                ", items=" + items +
                '}';
    }

    public Long getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(Long tableNumber) {
        this.tableNumber = tableNumber;
    }

    public List<KioskItemDTO> getItems() {
        return items;
    }

    public void setItems(List<KioskItemDTO> items) {
        this.items = items;
    }
}

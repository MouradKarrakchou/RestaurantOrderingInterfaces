package fr.teama.bff.entities;

import fr.teama.bff.controllers.dto.KioskOrderDTO;

import java.util.List;

public class KioskOrder {
    private String orderNumber;
    private List<KioskItem> items;

    public KioskOrder(String orderNumber, List<KioskItem> items) {
        this.orderNumber = orderNumber;
        this.items = items;
    }

    public KioskOrder(KioskOrderDTO kioskOrderDTO) {
        // TODO: 2020-03-31
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public List<KioskItem> getItems() {
        return items;
    }

    public void setItems(List<KioskItem> items) {
        this.items = items;
    }
}

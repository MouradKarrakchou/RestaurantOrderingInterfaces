package fr.teama.bff.controllers.dto;

import java.util.List;

public class KioskOrderDTO {
    private String orderNumber;
    private List<KioskItemDTO> items;

    public KioskOrderDTO() {
    }

    public KioskOrderDTO(String orderNumber, List<KioskItemDTO> items) {
        this.orderNumber = orderNumber;
        this.items = items;
    }

    @Override
    public String toString() {
        return "KioskOrderDTO{" +
                "orderNumber='" + orderNumber + '\'' +
                ", items=" + items +
                '}';
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public List<KioskItemDTO> getItems() {
        return items;
    }

    public void setItems(List<KioskItemDTO> items) {
        this.items = items;
    }
}

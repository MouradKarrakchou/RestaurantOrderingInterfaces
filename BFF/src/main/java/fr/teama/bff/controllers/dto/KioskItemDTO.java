package fr.teama.bff.controllers.dto;

import java.util.UUID;

public class KioskItemDTO {
    private String itemID;

    private String shortName;

    private int quantity;

    public KioskItemDTO() {
    }

    public KioskItemDTO(String itemID, String shortName, int quantity) {
        this.itemID = itemID;
        this.shortName = shortName;
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "KioskItemDTO{" +
                "itemID='" + itemID + '\'' +
                ", shortName='" + shortName + '\'' +
                ", quantity=" + quantity +
                '}';
    }

    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

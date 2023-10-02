package fr.teama.bff.entities;

import java.util.UUID;

public class KioskItem {
    private UUID itemID;

    private String shortName;
    private int quantity;

    public KioskItem(UUID itemID, String shortName, int quantity) {
        this.itemID = itemID;
        this.shortName = shortName;
        this.quantity = quantity;
    }

    public UUID getItemID() {
        return itemID;
    }

    public void setItemID(UUID itemID) {
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

package fr.teama.bff.entities;

public class ItemQuantity {
    int quantity;
    MenuItem menuItem;

    public ItemQuantity(MenuItem menuItem, int quantity) {
        this.quantity = quantity;
        this.menuItem = menuItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }
}

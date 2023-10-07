package fr.teama.bff.connectors.externalDTO;

import fr.teama.bff.controllers.dto.KioskItemDTO;

public class ItemDTO {

    private String id; // id of the item from the menu

    private String shortName;

    private int howMany;

    public ItemDTO() {
    }

    public ItemDTO(KioskItemDTO kioskItemDTO) {
        this.id = kioskItemDTO.getItemID();
        this.shortName = kioskItemDTO.getShortName();
        this.howMany = kioskItemDTO.getQuantity();
    }

    @Override
    public String toString() {
        return "ItemDTO{" +
                "id='" + id + '\'' +
                ", shortName='" + shortName + '\'' +
                ", howMany=" + howMany +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public int getHowMany() {
        return howMany;
    }

    public void setHowMany(int howMany) {
        this.howMany = howMany;
    }

}

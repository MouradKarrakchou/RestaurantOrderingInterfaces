package fr.teama.bff.controllers.dto;

import java.util.List;

public class KioskOrderDTO {
    private List<KioskItemDTO> items;

    public KioskOrderDTO() {
    }

    public KioskOrderDTO(List<KioskItemDTO> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "KioskOrderDTO{" +
                "items=" + items +
                '}';
    }

    public List<KioskItemDTO> getItems() {
        return items;
    }

    public void setItems(List<KioskItemDTO> items) {
        this.items = items;
    }
}

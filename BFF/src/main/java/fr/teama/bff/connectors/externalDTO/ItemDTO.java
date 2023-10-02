package fr.teama.bff.connectors.externalDTO;

public class ItemDTO {

    private String id; // id of the item from the menu

    private String shortName;

    private int howMany;

    public ItemDTO() {
    }

    public ItemDTO(OrderingLineDTO orderingLineDTO) {
        this.id = orderingLineDTO.getItem().getId();
        this.shortName = orderingLineDTO.getItem().getShortName();
        this.howMany = orderingLineDTO.getHowMany();
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

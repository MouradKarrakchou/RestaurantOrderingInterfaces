package fr.teama.bff.entities;

public class Item {
    private String shortName;
    private int howMany;

    public Item(String shortName, int howMany) {
        this.shortName = shortName;
        this.howMany = howMany;
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

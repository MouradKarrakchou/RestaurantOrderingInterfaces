package fr.teama.bff.connectors.externalDTO;

import java.util.Objects;
import java.util.UUID;

public class CookedItem {

    private UUID id;

    private String shortName;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CookedItem)) return false;
        CookedItem that = (CookedItem) o;
        return shortName.equals(that.shortName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, shortName);
    }
}

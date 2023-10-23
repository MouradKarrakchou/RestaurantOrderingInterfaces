package fr.teama.bff.connectors.externalDTO;

import java.util.Objects;
import java.util.UUID;

public class TableDTO {

    private Long number;

    private boolean taken;

    private UUID tableOrderId;

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public boolean isTaken() {
        return taken;
    }

    public void setTaken(boolean taken) {
        this.taken = taken;
    }

    public UUID getTableOrderId() {
        return tableOrderId;
    }

    public void setTableOrderId(UUID tableOrderId) {
        this.tableOrderId = tableOrderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TableDTO)) return false;
        TableDTO tableDTO = (TableDTO) o;
        return taken == tableDTO.taken && Objects.equals(number, tableDTO.number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number, taken);
    }
}

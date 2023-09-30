package fr.teama.bff.entities;

import java.util.Objects;

public class Table {

    private Long number;

    private boolean taken;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Table)) return false;
        Table table = (Table) o;
        return taken == table.taken && Objects.equals(number, table.number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number, taken);
    }
}

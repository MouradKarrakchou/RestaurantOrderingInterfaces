package fr.teama.bff.entities;

public class Table {

    private Long number;

    private boolean taken;

    private KioskOrder order;

    public Table(Long number) {
        this.number = number;
        this.taken = false;
    }

    public Table(Long number, boolean taken) {
        this.number = number;
        this.taken = taken;
    }

    public KioskOrder getOrder(){
        return this.order;
    }

    public boolean isTaken() {
        return taken;
    }

    public void takeTable(KioskOrder order){
            boolean taken = true;
            this.order = order;
        }

        public void freeTable(){
            boolean taken = false;
            this.order = null;
        }

    public Long getNumber() {
        return number;
    }
}

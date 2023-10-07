package fr.teama.bff.connectors.externalDTO;

public class StartOrderingDTO {

    private Long tableId;

    private int customersCount;

    public StartOrderingDTO() {
    }

    public StartOrderingDTO(Long tableId, int customersCount) {
        this.tableId = tableId;
        this.customersCount = customersCount;
    }

    public int getCustomersCount() {
        return customersCount;
    }

    public void setCustomersCount(int customersCount) {
        this.customersCount = customersCount;
    }

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }

}

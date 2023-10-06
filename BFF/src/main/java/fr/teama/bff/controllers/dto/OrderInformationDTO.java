package fr.teama.bff.controllers.dto;

import java.util.UUID;

public class OrderInformationDTO {
    public UUID tableOrderId;
    public long orderId;

    public OrderInformationDTO() {
    }

    public OrderInformationDTO(UUID tableOrderId, long orderId) {
        this.tableOrderId = tableOrderId;
        this.orderId = orderId;
    }

    public UUID getTableOrderId() {
        return tableOrderId;
    }

    public void setTableOrderId(UUID tableOrderId) {
        this.tableOrderId = tableOrderId;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }
}

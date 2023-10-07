package fr.teama.bff.entities;

import java.time.LocalDateTime;
import java.util.UUID;

public class TableOrderInformation {
    private UUID tableOrderId;
    private LocalDateTime shouldBeReadyAt;

    public TableOrderInformation(UUID tableOrderId, LocalDateTime shouldBeReadyAt) {
        this.tableOrderId = tableOrderId;
        this.shouldBeReadyAt = shouldBeReadyAt;
    }

    @Override
    public String toString() {
        return "TableOrderInformation{" +
                "tableOrderId=" + tableOrderId +
                ", shouldBeReadyAt=" + shouldBeReadyAt +
                '}';
    }

    public UUID getTableOrderId() {
        return tableOrderId;
    }

    public void setTableOrderId(UUID tableOrderId) {
        this.tableOrderId = tableOrderId;
    }

    public LocalDateTime getShouldBeReadyAt() {
        return shouldBeReadyAt;
    }

    public void setShouldBeReadyAt(LocalDateTime shouldBeReadyAt) {
        this.shouldBeReadyAt = shouldBeReadyAt;
    }
}

package fr.teama.bff.connectors.externalDTO;

import com.fasterxml.jackson.annotation.JsonView;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class KitchenPreparation {
    private UUID id;
    private LocalDateTime shouldBeReadyAt;
    private LocalDateTime completedAt;
    private LocalDateTime takenForServiceAt; // brought to the table
    private List<KitchenItem> preparedItems;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public LocalDateTime getTakenForServiceAt() {
        return takenForServiceAt;
    }

    public void setTakenForServiceAt(LocalDateTime takenForServiceAt) {
        this.takenForServiceAt = takenForServiceAt;
    }

    public List<KitchenItem> getPreparedItems() {
        return preparedItems;
    }

    public void setPreparedItems(List<KitchenItem> preparedItems) {
        this.preparedItems = preparedItems;
    }

    public LocalDateTime getShouldBeReadyAt() {
        return shouldBeReadyAt;
    }

    public void setShouldBeReadyAt(LocalDateTime shouldBeReadyAt) {
        this.shouldBeReadyAt = shouldBeReadyAt;
    }
}

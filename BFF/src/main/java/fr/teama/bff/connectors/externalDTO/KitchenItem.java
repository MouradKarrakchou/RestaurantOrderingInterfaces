package fr.teama.bff.connectors.externalDTO;

import java.time.LocalDateTime;
import java.util.UUID;

public class KitchenItem {
    private UUID id;
    private String shortName;
    private LocalDateTime shouldStartAt;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;

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

    public LocalDateTime getShouldStartAt() {
        return shouldStartAt;
    }

    public void setShouldStartAt(LocalDateTime shouldStartAt) {
        this.shouldStartAt = shouldStartAt;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(LocalDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }
}

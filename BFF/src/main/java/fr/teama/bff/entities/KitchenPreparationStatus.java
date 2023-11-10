package fr.teama.bff.entities;

import fr.teama.bff.connectors.externalDTO.KitchenItem;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class KitchenPreparationStatus {
    private UUID id;
    private LocalDateTime completedAt;
    private LocalDateTime takenForServiceAt;
    private Post post;
    private Status status;
    private List<Item> preparedItems;

    public KitchenPreparationStatus(UUID id, LocalDateTime completedAt, LocalDateTime takenForServiceAt, Post post, Status status) {
        this.id = id;
        this.completedAt = completedAt;
        this.takenForServiceAt = takenForServiceAt;
        this.post = post;
        this.status = status;
        this.preparedItems = new ArrayList<>();
    }

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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public List<Item> getPreparedItems() {
        return preparedItems;
    }

    public void setPreparedItems(List<Item> preparedItems) {
        this.preparedItems = preparedItems;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

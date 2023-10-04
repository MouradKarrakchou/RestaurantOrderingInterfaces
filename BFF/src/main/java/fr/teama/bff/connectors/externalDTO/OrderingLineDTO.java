package fr.teama.bff.connectors.externalDTO;

import java.util.Objects;

public class OrderingLineDTO {

    private OrderingItemDTO item;

    private int howMany;

    private boolean sentForPreparation;

    public OrderingItemDTO getItem() {
        return item;
    }

    public void setItem(OrderingItemDTO item) {
        this.item = item;
    }

    public int getHowMany() {
        return howMany;
    }

    public void setHowMany(int howMany) {
        this.howMany = howMany;
    }

    public boolean isSentForPreparation() {
        return sentForPreparation;
    }

    public void setSentForPreparation(boolean sentForPreparation) {
        this.sentForPreparation = sentForPreparation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderingLineDTO)) return false;
        OrderingLineDTO that = (OrderingLineDTO) o;
        return howMany == that.howMany && sentForPreparation == that.sentForPreparation && Objects.equals(item, that.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(item, howMany, sentForPreparation);
    }
}

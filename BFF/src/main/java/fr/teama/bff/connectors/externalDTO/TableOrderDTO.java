package fr.teama.bff.connectors.externalDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class TableOrderDTO {

        private UUID id;

        private Long tableNumber;

        private int customersCount;

        private LocalDateTime opened;

        private List<OrderingLineDTO> lines;

        private List<PreparationDTO> preparationDTOS;

        private LocalDateTime billed;

        public UUID getId() {
                return id;
        }

        public void setId(UUID id) {
                this.id = id;
        }

        public Long getTableNumber() {
                return tableNumber;
        }

        public void setTableNumber(Long tableNumber) {
                this.tableNumber = tableNumber;
        }

        public int getCustomersCount() {
                return customersCount;
        }

        public void setCustomersCount(int customersCount) {
                this.customersCount = customersCount;
        }

        public LocalDateTime getOpened() {
                return opened;
        }

        public void setOpened(LocalDateTime opened) {
                this.opened = opened.withNano(0); // MongoDB is precise at millisecond, not nano (avoid equality problem)
        }

        public List<OrderingLineDTO> getLines() {
                return lines;
        }

        public void setLines(List<OrderingLineDTO> lines) {
                this.lines = lines;
        }

        public List<PreparationDTO> getPreparations() {
                return preparationDTOS;
        }

        public void setPreparations(List<PreparationDTO> preparationDTOS) {
                this.preparationDTOS = preparationDTOS;
        }

        public LocalDateTime getBilled() {
                return billed;
        }

        public void setBilled(LocalDateTime billed) {
                if (billed!=null)
                        this.billed = billed.withNano(0);
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (!(o instanceof TableOrderDTO)) return false;
                TableOrderDTO that = (TableOrderDTO) o;
                return customersCount == that.customersCount && id.equals(that.id) && tableNumber.equals(that.tableNumber) && opened.equals(that.opened) && Objects.equals(lines, that.lines) && Objects.equals(preparationDTOS, that.preparationDTOS) && Objects.equals(billed, that.billed);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, tableNumber, customersCount, opened, lines, preparationDTOS, billed);
        }

}

import { OrderingLineDTO } from './OrderingLineDTO'; // Import other necessary DTO classes if needed
import { PreparationDTO } from './PreparationDTO'; // Import other necessary DTO classes if needed

export class TableOrderDTO {
  id: string;
  tableNumber: number;
  customersCount: number;
  opened: Date;
  lines: OrderingLineDTO[];
  preparationDTOS: PreparationDTO[];
  billed: Date;

  constructor(
    id: string,
    tableNumber: number,
    customersCount: number,
    opened: Date,
    lines: OrderingLineDTO[],
    preparationDTOS: PreparationDTO[],
    billed: Date
  ) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.customersCount = customersCount;
    this.opened = opened;
    this.lines = lines;
    this.preparationDTOS = preparationDTOS;
    this.billed = billed;
  }
}

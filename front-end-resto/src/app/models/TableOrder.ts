import { OrderingLine } from './OrderingLine'; // Import other necessary DTO classes if needed
import { Preparation } from './Preparation'; // Import other necessary DTO classes if needed

export class TableOrder {
  id: string;
  tableNumber: number;
  customersCount: number;
  opened: Date;
  lines: OrderingLine[];
  preparation: Preparation[];
  billed: Date;

  constructor(
    id: string,
    tableNumber: number,
    customersCount: number,
    opened: Date,
    lines: OrderingLine[],
    preparation: Preparation[],
    billed: Date
  ) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.customersCount = customersCount;
    this.opened = opened;
    this.lines = lines;
    this.preparation = preparation;
    this.billed = billed;
  }
}

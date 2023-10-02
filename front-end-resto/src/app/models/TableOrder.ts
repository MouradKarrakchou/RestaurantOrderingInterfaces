import OrderingLine from "./OrderingLine";
import Preparation from "./Preparation";

class TableOrder {
  private readonly id: number;
  private tableNumber: number;
  private customersCount: number;
  private opened: Date;
  private lines: OrderingLine[];
  private preparations: Preparation[];
  private billed: Date;

  constructor(
    id: number,
    tableNumber: number,
    customersCount: number,
    opened: Date,
    lines: OrderingLine[],
    preparations: Preparation[],
    billed: Date
  ) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.customersCount = customersCount;
    this.opened = opened;
    this.lines = lines;
    this.preparations = preparations;
    this.billed = billed;
  }

  getId(): number {
    return this.id;
  }

  getTableNumber(): number {
    return this.tableNumber;
  }

  setTableNumber(tableNumber: number): void {
    this.tableNumber = tableNumber;
  }

  getCustomersCount(): number {
    return this.customersCount;
  }

  setCustomersCount(customersCount: number): void {
    this.customersCount = customersCount;
  }

  getOpened(): Date {
    return this.opened;
  }

  setOpened(opened: Date): void {
    this.opened = new Date(opened);
    this.opened.setMilliseconds(0);
  }

  getLines(): OrderingLine[] {
    return this.lines;
  }

  setLines(lines: OrderingLine[]): void {
    this.lines = lines;
  }

  getPreparations(): Preparation[] {
    return this.preparations;
  }

  setPreparations(preparations: Preparation[]): void {
    this.preparations = preparations;
  }

  getBilled(): Date {
    return this.billed;
  }

  setBilled(billed: Date): void {
    if (billed) {
      this.billed = new Date(billed);
      this.billed.setMilliseconds(0);
    }
  }

  equals(other: TableOrder): boolean {
    return this.customersCount === other.getCustomersCount() &&
      this.id === other.getId() &&
      this.tableNumber === other.getTableNumber() &&
      this.opened.getTime() === other.getOpened().getTime() &&
      this.lines.every((line, index) => line.equals(other.getLines()[index])) &&
      this.preparations.every((preparation, index) => preparation.equals(other.getPreparations()[index])) &&
      (this.billed ? this.billed.getTime() === other.getBilled().getTime() : !other.getBilled());
  }

}

export default TableOrder;

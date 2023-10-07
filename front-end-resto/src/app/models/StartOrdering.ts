export class StartOrdering {
  tableId: number;
  customersCount: number;

  constructor(tableId: number, customersCount: number) {
    this.tableId = tableId;
    this.customersCount = customersCount;
  }
}

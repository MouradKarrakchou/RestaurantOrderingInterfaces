export class OrderInformation {
  tableOrderId: string;
  orderId: number;
  shouldBeReadyAt: Date;

  constructor(tableOrderId: string, orderId: number, shouldBeReadyAt: Date) {
    this.tableOrderId = tableOrderId;
    this.orderId = orderId;
    this.shouldBeReadyAt = shouldBeReadyAt;
  }
}

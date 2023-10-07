export class TableOrderInformation {
    tableOrderId: string;
     shouldBeReadyAt: Date;

    constructor(tableOrderId: string, shouldBeReadyAt: Date) {
        this.tableOrderId = tableOrderId;
        this.shouldBeReadyAt = shouldBeReadyAt;
    }
}

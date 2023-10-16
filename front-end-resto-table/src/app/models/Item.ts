export class Item {
  id: string;
  shortName: string
  howMany: number

  constructor(kioskItem: { itemID: string; quantity: number; shortName: string }) {
    this.id = kioskItem.itemID;
    this.shortName = kioskItem.shortName;
    this.howMany = kioskItem.quantity;
  }
}

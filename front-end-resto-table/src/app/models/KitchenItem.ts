export class KitchenItem {
  shortName: string;
  howMany: number;

  constructor(shortName: string, quantity: number) {
    this.shortName = shortName;
    this.howMany = quantity;
  }
}

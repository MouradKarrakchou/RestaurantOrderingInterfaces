import OrderingItem from "./OrderingItem";

export class OrderingLine {
  private item: OrderingItem;
  private howMany: number;
  private sentForPreparation: boolean;

  constructor(item: OrderingItem, howMany: number, sentForPreparation: boolean) {
    this.item = item;
    this.howMany = howMany;
    this.sentForPreparation = sentForPreparation;
  }

  getItem(): OrderingItem {
    return this.item;
  }

  setItem(item: OrderingItem): void {
    this.item = item;
  }

  getHowMany(): number {
    return this.howMany;
  }

  setHowMany(howMany: number): void {
    this.howMany = howMany;
  }

  isSentForPreparation(): boolean {
    return this.sentForPreparation;
  }

  setSentForPreparation(sentForPreparation: boolean): void {
    this.sentForPreparation = sentForPreparation;
  }

  equals(other: OrderingLine): boolean {
    return this.howMany === other.getHowMany() &&
      this.sentForPreparation === other.isSentForPreparation() &&
      this.item.equals(other.getItem());
  }
}

export default OrderingLine;

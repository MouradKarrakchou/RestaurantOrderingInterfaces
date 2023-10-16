import { OrderingItem } from './OrderingItem'; // Import the necessary DTO class if needed

export class OrderingLine {
  item: OrderingItem;
  howMany: number;
  sentForPreparation: boolean;

  constructor(item: OrderingItem, howMany: number, sentForPreparation: boolean) {
    this.item = item;
    this.howMany = howMany;
    this.sentForPreparation = sentForPreparation;
  }
}

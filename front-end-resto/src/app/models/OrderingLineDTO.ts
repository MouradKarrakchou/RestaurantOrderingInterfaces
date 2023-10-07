import { OrderingItemDTO } from './OrderingItemDTO'; // Import the necessary DTO class if needed

export class OrderingLineDTO {
  item: OrderingItemDTO;
  howMany: number;
  sentForPreparation: boolean;

  constructor(item: OrderingItemDTO, howMany: number, sentForPreparation: boolean) {
    this.item = item;
    this.howMany = howMany;
    this.sentForPreparation = sentForPreparation;
  }
}

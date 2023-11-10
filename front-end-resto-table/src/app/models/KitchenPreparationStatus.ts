import {KitchenItem} from "./KitchenItem";

export class KitchenPreparationStatus {
  id: string;
  completedAt: Date;
  takenForServingAt: Date;
  post: string;
  status: string;
  preparedItems: KitchenItem[];

  constructor(id: string, completedAt: Date, takenForServingAt: Date, post: string, status: string, preparedItems: KitchenItem[]) {
    this.id = id;
    this.completedAt = completedAt;
    this.takenForServingAt = takenForServingAt;
    this.post = post;
    this.status = status;
    this.preparedItems = preparedItems;
  }
}

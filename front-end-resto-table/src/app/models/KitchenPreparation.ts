import {KitchenItem} from "./KitchenItem";

export class KitchenPreparation {
  id: string;
  completedAt: Date;
  takenForServingAt: Date;
  preparedItems: KitchenItem[];

  constructor(id: string, completedAt: Date, takenForServingAt: Date, preparedItems: KitchenItem[]) {
    this.id = id;
    this.completedAt = completedAt;
    this.takenForServingAt = takenForServingAt;
    this.preparedItems = preparedItems;
  }
}

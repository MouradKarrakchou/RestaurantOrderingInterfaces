import { CookedItemDTO } from './CookingItemDTO';

export class PreparationDTO {
  id: string;
  shouldBeReadyAt: Date;
  preparedItems: CookedItemDTO[];

  constructor(id: string, shouldBeReadyAt: Date, preparedItems: CookedItemDTO[]) {
    this.id = id;
    this.shouldBeReadyAt = shouldBeReadyAt;
    this.preparedItems = preparedItems;
  }
}

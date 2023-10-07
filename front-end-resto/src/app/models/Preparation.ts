import { CookedItem } from './CookedItem';

export class Preparation {
  id: string;
  shouldBeReadyAt: Date;
  preparedItems: CookedItem[];

  constructor(id: string, shouldBeReadyAt: Date, preparedItems: CookedItem[]) {
    this.id = id;
    this.shouldBeReadyAt = shouldBeReadyAt;
    this.preparedItems = preparedItems;
  }
}

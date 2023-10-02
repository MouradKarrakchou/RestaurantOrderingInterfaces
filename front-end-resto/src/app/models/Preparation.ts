import CookedItem from "./CookedItem";

class Preparation {
  private readonly id: number;
  private shouldBeReadyAt: Date;
  private preparedItems: CookedItem[];

  constructor(id: number, shouldBeReadyAt: Date, preparedItems: CookedItem[]) {
    this.id = id;
    this.shouldBeReadyAt = shouldBeReadyAt;
    this.preparedItems = preparedItems;
  }

  getId(): number {
    return this.id;
  }

  getShouldBeReadyAt(): Date {
    return this.shouldBeReadyAt;
  }

  setShouldBeReadyAt(shouldBeReadyAt: Date): void {
    this.shouldBeReadyAt = shouldBeReadyAt;
  }

  getPreparedItems(): CookedItem[] {
    return this.preparedItems;
  }

  setPreparedItems(preparedItems: CookedItem[]): void {
    this.preparedItems = preparedItems;
  }

  equals(other: Preparation): boolean {
    return this.id === other.getId() &&
      this.shouldBeReadyAt.getTime() === other.getShouldBeReadyAt().getTime() &&
      this.preparedItems.every((item, index) => item.equals(other.getPreparedItems()[index]));
  }
}

export default Preparation;

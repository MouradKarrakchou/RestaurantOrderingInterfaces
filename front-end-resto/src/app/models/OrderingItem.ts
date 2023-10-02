class OrderingItem {
  private readonly id: number;
  private shortName: string;
  private category: string;

  constructor(id: number, shortName: string, category: string) {
    this.id = id;
    this.shortName = shortName;
    this.category = category;
  }

  getId(): number {
    return this.id;
  }

  getShortName(): string {
    return this.shortName;
  }

  setShortName(shortName: string): void {
    this.shortName = shortName;
  }

  getCategory(): string {
    return this.category;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  equals(other: OrderingItem): boolean {
    return this.id === other.getId() && this.shortName === other.getShortName() && this.category === other.getCategory();
  }

}

export default OrderingItem;

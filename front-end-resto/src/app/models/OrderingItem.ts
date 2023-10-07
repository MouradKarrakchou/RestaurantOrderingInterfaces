export class OrderingItem {
  id: string;
  shortName: string;
  category: string;

  constructor(id: string, shortName: string, category: string) {
    this.id = id;
    this.shortName = shortName;
    this.category = category;
  }
}

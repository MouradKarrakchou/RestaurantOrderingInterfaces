export class CookedItemDTO {
  id: string; // Assuming UUID is represented as a string
  shortName: string;
  constructor(id: string, shortName: string) {
    this.id = id;
    this.shortName = shortName;
  }
}

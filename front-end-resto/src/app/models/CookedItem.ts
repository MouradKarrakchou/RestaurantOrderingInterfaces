
class CookedItem {
  private readonly id: number;
  private shortName: string;

  constructor(shortName: string, id: number) {
    this.id = id;
    this.shortName = shortName;
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

  equals(other: CookedItem): boolean {
    return this.shortName === other.getShortName();
  }
}

export default CookedItem;

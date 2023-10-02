
class Table {
  private number: number;
  private taken: boolean;

  constructor(number: number, taken: boolean) {
    this.number = number;
    this.taken = taken;
  }

  getNumber(): number {
    return this.number;
  }

  setNumber(number: number): void {
    this.number = number;
  }

  isTaken(): boolean {
    return this.taken;
  }

  setTaken(taken: boolean): void {
    this.taken = taken;
  }

  equals(other: Table): boolean {
    return this.taken === other.isTaken() && this.number === other.getNumber();
  }
}

export default Table;

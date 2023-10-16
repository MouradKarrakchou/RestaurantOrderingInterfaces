import MenuItem from "./MenuItem";

export class ItemQuantity {
  quantity: number;
  menuItem: MenuItem;

  constructor(menuItem: MenuItem , quantity: number) {
    this.quantity = quantity;
    this.menuItem = menuItem;
  }
}

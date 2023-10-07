import MenuItem from "./MenuItem";

class BasketItem {
  menuItem: MenuItem;
  quantity: number;

  constructor(item: MenuItem, quantity: number) {
    this.menuItem = item;
    this.quantity = quantity;
  }
}

export default BasketItem;

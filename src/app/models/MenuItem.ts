import Category from "./Category";

class MenuItem {
  id: string;
  fullName: string;
  shortName: string;
  price: number;
  category: Category;
  image: URL;

  constructor(
    id: string,
    fullName: string,
    shortName: string,
    price: number,
    category: Category,
    image: URL
  ) {
    this.id = id;
    this.fullName = fullName;
    this.shortName = shortName;
    this.price = price;
    this.category = category;
    this.image = image;
  }
}

export default MenuItem;

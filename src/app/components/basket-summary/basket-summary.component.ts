import {Component, OnInit} from '@angular/core';
import MenuItem from "../../models/MenuItem";
import BasketItem from "../../models/BasketItem";
import Category from "../../models/Category";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit {

  menuItems: MenuItem[] = []; // To remove when getting data from basket
  basket: BasketItem[] = [];
  basketStarters: BasketItem[] = [];
  basketMains: BasketItem[] = [];
  basketDesserts: BasketItem[] = [];
  basketBeverages: BasketItem[] = [];

  canEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initMenuItems(); // To remove when getting data from basket
  }

  // To remove when getting data from basket
  initMenuItems(): void {
    this.fetchMenuItems()
      .then((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
        this.convertIntoBasket();
        this.fillBasketCategories();
        console.log("Les menu items ont été récupérés :", menuItems);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
      });
  }

  // To remove when getting data from basket
  async fetchMenuItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch("http://localhost:3000/menus"); // Assurez-vous que votre serveur est en cours d'exécution à l'adresse spécifiée

      const data = await response.json();

      // Convertir les données JSON en des objets MenuItem
      return data.map((item: any) => {
        return new MenuItem(
          item.id,
          item.fullName,
          item.shortName,
          item.price,
          item.category,
          new URL(item.image)
        );
      });
    } catch (error) {
      // Gérer les erreurs de la requête
      console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
      throw error;
    }
  }

  // To remove when getting data from basket
  convertIntoBasket(): void {
    this.menuItems.forEach((item: MenuItem) => {
      this.basket.push(new BasketItem(item, Math.floor(Math.random() * 3)));
    });
  }

  fillBasketCategories(): void {
    this.basketStarters = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.STARTER && item.quantity > 0);
    this.basketMains = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.MAIN && item.quantity > 0);
    this.basketDesserts = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.DESSERT && item.quantity > 0);
    this.basketBeverages = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.BEVERAGE && item.quantity > 0);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import BasketItem from "../../models/BasketItem";
import Category from "../../models/Category";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit {

  basket: BasketItem[] = [];

  basketStarters: BasketItem[] = [];
  basketMains: BasketItem[] = [];
  basketDesserts: BasketItem[] = [];
  basketBeverages: BasketItem[] = [];

  @Input() canEdit: boolean = false;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.initBasket();
  }

  initBasket(): void {
    this.basket = this.basketService.getBasket();
    this.splitBasketCategories();

    this.basketService.basket.subscribe((basket: BasketItem[]) => {
      this.basket = basket;
      this.splitBasketCategories();
    });
  }

  splitBasketCategories(): void {
    this.basketStarters = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.STARTER);
    this.basketMains = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.MAIN);
    this.basketDesserts = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.DESSERT);
    this.basketBeverages = this.basket.filter((item: BasketItem) => item.menuItem.category === Category.BEVERAGE);
  }

  addItemQuantity(item: BasketItem) {
    this.basketService.addToBasket(item.menuItem);
  }

  removeItemQuantity(item: BasketItem) {
    this.basketService.removeFromBasket(item.menuItem);
  }
}

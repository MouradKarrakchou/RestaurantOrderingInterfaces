import {Component, Input, OnInit} from '@angular/core';
import BasketItem from "../../models/BasketItem";
import Category from "../../models/Category";
import {BasketService} from "../../services/basket.service";
import {ActivatedRoute} from "@angular/router";

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
  tabletId: string = '0';

  constructor(private basketService: BasketService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      this.initBasket();
    });
  }

  initBasket(): void {
    this.basket = this.basketService.getBasket(this.tabletId);
    this.splitBasketCategories();

    this.basketService.baskets[this.tabletId].subscribe((basket: BasketItem[]) => {
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
    this.basketService.addToBasket(this.tabletId, item.menuItem);
  }

  removeItemQuantity(item: BasketItem) {
    this.basketService.removeFromBasket(this.tabletId, item.menuItem);
  }
}

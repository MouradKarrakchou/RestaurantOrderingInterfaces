import { Injectable } from '@angular/core';
import BasketItem from "../models/BasketItem";
import MenuItem from "../models/MenuItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: BehaviorSubject<BasketItem[]> = new BehaviorSubject<BasketItem[]>([]);

  constructor() { }

  addToBasket(item: MenuItem) {
    let basketItem = this.basket.value.find(basketItem => basketItem.menuItem.id === item.id);
    if (basketItem) {
      basketItem.quantity++;
    } else {
      this.basket.value.push(new BasketItem(item, 1));
    }
    this.basket.next(this.basket.value);
  }

  removeFromBasket(item: MenuItem) {
    let basketItem = this.basket.value.find(basketItem => basketItem.menuItem.id === item.id);
    if (basketItem == undefined) {
      return;
    }

    if (basketItem.quantity > 1) {
      basketItem.quantity--;
    } else {
      this.basket.value.splice(this.basket.value.indexOf(basketItem), 1);
    }
    this.basket.next(this.basket.value);
  }

  emptyBasket() {
    this.basket.next([]);
  }

  getBasketTotal(): number {
    return this.basket.value.reduce((total, basketItem) => total + basketItem.menuItem.price * basketItem.quantity, 0);
  }

  getBasket(): BasketItem[] {
    return this.basket.value;
  }

}

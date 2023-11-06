import { Injectable } from '@angular/core';
import BasketItem from "../models/BasketItem";
import MenuItem from "../models/MenuItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

    basket: BehaviorSubject<BasketItem[]> = new BehaviorSubject<BasketItem[]>([]);
    baskets: { [key: string]: BehaviorSubject<BasketItem[]> } = {
    '1': new BehaviorSubject<BasketItem[]>([]),
    '2': new BehaviorSubject<BasketItem[]>([]),
    '3': new BehaviorSubject<BasketItem[]>([]),
    '4': new BehaviorSubject<BasketItem[]>([]),
  };
  selectedTables: Map<number, BasketItem[] | string> = new Map<number, BasketItem[] | string>([
    [1, "empty"],
    [2, "empty"],
    [3, "empty"],
    [4, "empty"]
  ]);

  constructor() { }

  addToBasket(tabletId: string, item: MenuItem) {
    let basketItem = this.baskets[tabletId].value.find(basketItem => basketItem.menuItem.id === item.id);
    if (basketItem) {
      basketItem.quantity++;
    } else {
      this.baskets[tabletId].value.push(new BasketItem(item, 1));
    }
    this.baskets[tabletId].next(this.baskets[tabletId].value);
  }

  removeFromBasket(tabletId: string, item: MenuItem) {
    let basketItem = this.baskets[tabletId].value.find(basketItem => basketItem.menuItem.id === item.id);
    if (basketItem == undefined) {
      return;
    }

    if (basketItem.quantity > 1) {
      basketItem.quantity--;
    } else {
      this.baskets[tabletId].value.splice(this.baskets[tabletId].value.indexOf(basketItem), 1);
    }
    this.baskets[tabletId].next(this.baskets[tabletId].value);
  }

  emptyBasket(tabletId: string) {
    this.baskets[tabletId].next([]);
  }

  emptyAllBaskets() {
    this.baskets['1'].next([]);
    this.baskets['2'].next([]);
    this.baskets['3'].next([]);
    this.baskets['4'].next([]);
  }

  getBasketTotal(tabletId: string): number {
    return this.baskets[tabletId].value.reduce((total, basketItem) => total + basketItem.menuItem.price * basketItem.quantity, 0);
  }

  getAllBasketsTotal(): number {
    let total = 0;
    for (let i = 1; i <= 4; i++) {
      total += this.baskets[i].value.reduce((total, basketItem) => total + basketItem.menuItem.price * basketItem.quantity, 0);
    }
    return total;
  }

  getBasket(tabletId: string): BasketItem[] {
    return this.baskets[tabletId].value;
  }

  getAllBaskets(): BasketItem[] {
    let allBaskets: any[] = [];
    for (let i = 1; i <= 4; i++) {
      allBaskets = allBaskets.concat(this.baskets[i].value);
    }
    return allBaskets;
  }

  getBasketSize(tabletId: string): number {
    return this.baskets[tabletId].value.reduce((total, basketItem) => total + basketItem.quantity, 0);
  }

  getAllBasketsSize(): number {
    let total = 0;
    for (let i = 1; i <= 4; i++) {
      total += this.baskets[i].value.reduce((total, basketItem) => total + basketItem.quantity, 0);
    }
    return total;
  }
  setSelectedTable(number: number) {
    this.selectedTables.set(number, []);
  }
}

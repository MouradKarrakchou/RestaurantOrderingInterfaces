import { Injectable } from '@angular/core';
import BasketItem from "../models/BasketItem";
import MenuItem from "../models/MenuItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baskets: { [key: string]: BehaviorSubject<BasketItem[]> } = {
    '1': new BehaviorSubject<BasketItem[]>([]),
    '2': new BehaviorSubject<BasketItem[]>([]),
    '3': new BehaviorSubject<BasketItem[]>([]),
    '4': new BehaviorSubject<BasketItem[]>([]),
  };

  alreadyOrdered: { [key: string]: BasketItem[] | undefined } = {
    '1': undefined,
    '2': undefined,
    '3': undefined,
    '4': undefined,
  };

  readyToOrder: BehaviorSubject<Map<string, boolean>> = new BehaviorSubject<Map<string, boolean>>(new Map<string, boolean>([
    ["1", false],
    ["2", false],
    ["3", false],
    ["4", false]
  ]));

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

  getAllTabletteActivated(): number[] {
    let allTables = [];
    for (let i = 1; i <= 4; i++) {
      if (this.alreadyOrdered[i]) {
        allTables.push(i);
      }
    }
    return allTables;
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

  setSelectedTable(number: string) {
    this.alreadyOrdered[number] = [];
  }

  getBasketReadyToOrder(tabletId: string) {
    let readyMap = this.readyToOrder.value;
    readyMap.set(tabletId, true);
    this.readyToOrder.next(readyMap);
  }

  getBasketNotReadyToOrder(tabletId: string) {
    let readyMap = this.readyToOrder.value;
    readyMap.set(tabletId, false);
    this.readyToOrder.next(readyMap);
  }

  confirmBasket() {
    let readyMap = this.readyToOrder.value;
    for (let i = 1; i <= 4; i++) {
      if (this.baskets[i].value.length !== 0) {
        this.alreadyOrdered[i.toString()] = this.baskets[i].value;
        this.baskets[i].next([]);
      }
      readyMap.set(i.toString(), false);
    }
    this.readyToOrder.next(readyMap);
  }
}

import { Injectable } from '@angular/core';
import BasketItem from "../models/BasketItem";
import {BasketService} from "./basket.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  groupPayment: boolean = false;

  alreadyPaid: { [key: string]: boolean } = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
  };

  constructor(private basketService: BasketService) { }

  setGroupPayment(groupPayment: boolean) {
    this.groupPayment = groupPayment;
  }

  getGroupPayment() {
    return this.groupPayment;
  }

  setPaid(tabletId: string) {
    this.alreadyPaid[tabletId] = true;
    //check if evryone has paid
    let everyonePaid = true;
    let listOfCustomer= this.basketService.getAllTabletteActivated();
    for (const key of listOfCustomer) {
      if (!this.alreadyPaid[key]) {
        everyonePaid = false;
      }
    }
    //TODO : if everyone has paid then reset everything
  }
}

import { Injectable } from '@angular/core';
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

  everyonePaid: boolean = false;

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
    if (everyonePaid) {
      this.basketService.emptyAllBasketsAlreadyOrdered();
      this.everyonePaid = true;
    }
  }
}

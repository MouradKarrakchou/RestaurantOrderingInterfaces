import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  groupPayment: boolean = false;

  constructor() { }

  setGroupPayment(groupPayment: boolean) {
    this.groupPayment = groupPayment;
  }

  getGroupPayment() {
    return this.groupPayment;
  }
}

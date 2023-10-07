import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderIdService {

  orderIdLinkWithTableOrderId: Map<number, string> = new Map<number, string>();
  nextOrderId: number = 1;

  constructor() { }

  getNextOrderId(): number {
    return this.nextOrderId;
  }

  incrementOrderId(): void {
    this.nextOrderId++;
  }

  linkOrderIdWithTableOrderId(orderId: number, tableOrderId: string): void {
    this.orderIdLinkWithTableOrderId.set(orderId, tableOrderId);
  }
}

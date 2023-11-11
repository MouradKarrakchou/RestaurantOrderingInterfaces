import { Injectable } from '@angular/core';
import {BasketService} from "./basket.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  constructor(private basketService: BasketService,private http: HttpClient) { }
  everyonePaid: boolean = false;


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
    if (everyonePaid){
      const url = "http://localhost:8080/api/connected-table/bill";

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const data = {
        tableNumber: 1
      }
      this.http.post<any>(url, data, httpOptions);
      this.basketService.emptyAllBasketsAlreadyOrdered();
      this.everyonePaid = true;

    }
  }
}

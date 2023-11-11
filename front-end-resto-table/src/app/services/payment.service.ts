import { Injectable } from '@angular/core';
import {BasketService} from "./basket.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserTabletState} from "./state.service";

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
      this.http.post<any>(url, 1, httpOptions).subscribe(
        (response) => {
          console.log('POST request successful: ', response);
          this.basketService.emptyAllBasketsAlreadyOrdered();
          this.everyonePaid = true;
        },
        (error) => {
          console.error('Error in POST request: ', error);
          this.basketService.emptyAllBasketsAlreadyOrdered();
          this.everyonePaid = true;
        }
      );

    }

  }
}

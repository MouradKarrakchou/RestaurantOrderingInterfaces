import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import MenuItem from "../../models/MenuItem";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private router: Router, private basketService: BasketService, private http: HttpClient) {}

  basket_total_price = 0

  ngOnInit(): void {
    this.basket_total_price = this.basketService.getBasketTotal();
  }

  redirectToCatalog() {
    this.router.navigate(['/home']);
  }

  redirectToOrderNumber() {
    this.basketService.getBasket();
    this.sendOrderToBFF().subscribe(orderId => {
      this.basketService.emptyBasket();
      this.router.navigate(['/order-number'], orderId);
    });
  }

  sendOrderToBFF(): Observable<any> {
    const url = "http://localhost:3000/api/order";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const data = {
      items: this.basketService.getBasket().map(item => ({
        itemID: item.menuItem.id,
        shortName: item.menuItem.shortName,
        quantity: item.quantity
      }))
    }

    return this.http.post<any>(url, data, httpOptions);
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;
  orderNumber: string | undefined;

  constructor(private router: Router, private basketService: BasketService, private http: HttpClient) { }

  ngOnInit(): void {
    this.time = new Date();

    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.sendOrderToBFF().subscribe(orderInformation => {
      this.orderNumber = orderInformation.orderId;
      console.log(orderInformation);
      this.basketService.emptyBasket();
    });

    setTimeout(() => {
      this.router.navigate(['/idle'])
    }, 30000)
  }

  sendOrderToBFF(): Observable<any> {
    const url = "http://localhost:8080/api/order";

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

    console.log(data);

    return this.http.post<any>(url, data, httpOptions);
  }
}

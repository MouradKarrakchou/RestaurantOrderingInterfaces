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
  shouldBeReadyAt: Date | undefined;
  idleTimeout: NodeJS.Timeout | undefined;
  tabletId: string = "0";

  constructor(private router: Router,
              private basketService: BasketService,
              private http: HttpClient,
              private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];

      this.time = new Date();

      setInterval(() => {
        this.time = new Date();
      }, 1000);

      if (this.basketService.getBasketSize(this.tabletId) !== 0) {
        this.sendOrderToBFF().subscribe(orderInformation => {
          this.orderNumber = orderInformation.orderId;
          this.shouldBeReadyAt = new Date(orderInformation.shouldBeReadyAt);
          console.log(orderInformation);
          this.basketService.emptyBasket(this.tabletId);
        });
      }

      this.idleTimeout = setTimeout(() => {
        this.router.navigate(['/idle', this.tabletId])
      }, 20000);
    });
  }

  sendOrderToBFF(): Observable<any> {
    const url = "http://localhost:8080/api/order";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const data = {
      items: this.basketService.getBasket(this.tabletId).map(item => ({
        itemID: item.menuItem.id,
        shortName: item.menuItem.shortName,
        quantity: item.quantity
      }))
    }

    console.log(data);

    return this.http.post<any>(url, data, httpOptions);
  }

  quit(): void {
    clearTimeout(this.idleTimeout);
    this.router.navigate(['/idle', this.tabletId])
  }

}

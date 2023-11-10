import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StateService, UserTabletState} from "../../services/state.service";
import {OrderInformation} from "../../models/OrderInformation";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;
  tabletId: string = "0";
  isOrderAgain: boolean=false;

  orderNumber: string | undefined;
  shouldBeReadyAt: Date | undefined;
  idleTimeout: NodeJS.Timeout | undefined;

  orderInformation: OrderInformation | undefined;


  constructor(private router: Router,
              private basketService: BasketService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private state: StateService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];

      this.time = new Date();

      setInterval(() => {
        this.time = new Date();
      }, 1000);

      if (this.basketService.getBasketSize(this.tabletId) !== 0) {
        this.basketService.getBasketReadyToOrder(this.tabletId);
        this.isOrderAgain=this.state.getUserTabletState(this.tabletId)==="OrderAgain";
        this.state.setUserTabletState(this.tabletId, UserTabletState.Game);
        if (this.isOrderAgain){
          this.sendOrderToBFF().subscribe((orderInformation: { orderId: string | undefined; shouldBeReadyAt: string | number | Date; }) => {
            this.orderNumber = orderInformation.orderId;
            this.shouldBeReadyAt = new Date(orderInformation.shouldBeReadyAt);
            console.log(orderInformation);
            this.basketService.confirmBasketForIndex(this.tabletId);
          });
          this.idleTimeout = setTimeout(() => {
            this.router.navigate(['/game',this.tabletId])
          }, 5000);
        }
      }

    });
  }

  sendOrderToBFF(): Observable<any> {
    const url = "http://localhost:8080/api/connected-table/order";

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
      })),
      tableNumber: 1
    }

    console.log(data);

    return this.http.post<any>(url, data, httpOptions);
  }





  modify(): void {
    this.basketService.getBasketNotReadyToOrder(this.tabletId);
    this.state.setUserTabletState(this.tabletId, UserTabletState.Normal);
    this.router.navigate(['/home', this.tabletId])
  }

}

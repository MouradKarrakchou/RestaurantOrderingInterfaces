import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {HttpClient} from "@angular/common/http";
import {StateService, UserTabletState} from "../../services/state.service";

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;
  tabletId: string = "0";

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
        this.state.setUserTabletState(this.tabletId, UserTabletState.Prevalidated);
      }

    });
  }

  modify(): void {
    this.basketService.getBasketNotReadyToOrder(this.tabletId);
    this.state.setUserTabletState(this.tabletId, UserTabletState.Normal);
    this.router.navigate(['/home', this.tabletId])
  }

}

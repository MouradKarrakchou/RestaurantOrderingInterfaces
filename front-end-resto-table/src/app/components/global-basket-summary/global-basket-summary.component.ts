import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-global-basket-summary',
  templateUrl: './global-basket-summary.component.html',
  styleUrls: ['./global-basket-summary.component.css']
})
export class GlobalBasketSummaryComponent implements OnInit {

  constructor(private router: Router, private basketService: BasketService,
              private route: ActivatedRoute) {}

  basket_total_price = 0
  tabletId: string = "0";

  ngOnInit(): void {
    this.basket_total_price = this.basketService.getAllBasketsTotal();
  }

  redirectToCatalog() {
    this.router.navigate(['/home', this.tabletId]);
  }

  redirectToOrderNumber() {
    this.router.navigate(['/order-number', this.tabletId]);
  }

}

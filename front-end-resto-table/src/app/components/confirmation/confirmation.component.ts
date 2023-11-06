import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private router: Router, private basketService: BasketService,
              private route: ActivatedRoute) {}

  basket_total_price = 0
  tabletId: string = "0";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      this.basket_total_price = this.basketService.getBasketTotal(this.tabletId);
    });
  }

  redirectToCatalog() {
    this.router.navigate(['/home', this.tabletId]);
  }

  redirectToOrderNumber() {
    this.router.navigate(['/order-number', this.tabletId]);
  }

}

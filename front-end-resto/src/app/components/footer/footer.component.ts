import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../services/basket.service";
import BasketItem from "../../models/BasketItem";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router,
              private basketService: BasketService) {}

  basketTotalPrice = 0;
  basketSize = 0;

  ngOnInit(): void {
    this.basketTotalPrice = this.basketService.getBasketTotal();
    this.basketSize = this.basketService.getBasketSize();

    this.basketService.basket.subscribe((basket: BasketItem[]) => {
      this.basketTotalPrice = this.basketService.getBasketTotal();
      this.basketSize = this.basketService.getBasketSize();
    });
  }

  redirectToConfirmation() {
    this.router.navigate(['/confirmation'])
  }
}

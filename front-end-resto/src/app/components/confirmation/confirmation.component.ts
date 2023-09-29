import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private router: Router, private basket: BasketService) {}

  basket_total_price = 0

  ngOnInit(): void {
    this.basket_total_price = this.basket.getBasketTotal();
  }

  redirectToCatalog() {
    this.router.navigate(['/home']);
  }

  redirectToOrderNumber() {
    this.router.navigate(['/order-number']);
  }

}

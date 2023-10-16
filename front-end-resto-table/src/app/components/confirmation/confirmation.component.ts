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

  constructor(private router: Router, private basketService: BasketService) {}

  basket_total_price = 0

  ngOnInit(): void {
    this.basket_total_price = this.basketService.getBasketTotal();
  }

  redirectToCatalog() {
    this.router.navigate(['/home']);
  }

  redirectToOrderNumber() {
    this.router.navigate(['/order-number']);
  }

}

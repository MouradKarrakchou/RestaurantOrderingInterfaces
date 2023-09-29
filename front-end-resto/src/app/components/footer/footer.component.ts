import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../services/basket.service";
import BasketItem from "../../models/BasketItem";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogContentComponent} from "../dialog-content/dialog-content.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router,
              private basketService: BasketService,
              private dialog: MatDialog) {}

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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '450px',
      data: { message: 'Are you sure you want to abort your order? You will lose your basket' },
    });
  }
}

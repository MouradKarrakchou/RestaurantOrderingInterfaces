import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../../services/basket.service";
import BasketItem from "../../../models/BasketItem";
import {ActivatedRoute, Router} from "@angular/router";
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
              private dialog: MatDialog,
              private route: ActivatedRoute) {}

  basketTotalPrice = 0;
  basketSize = 0;
  tabletId: string = "0";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      this.basketTotalPrice = this.basketService.getBasketTotal(this.tabletId);
      this.basketSize = this.basketService.getBasketSize(this.tabletId);

      this.basketService.baskets[this.tabletId].subscribe((basket: BasketItem[]) => {
        this.basketTotalPrice = this.basketService.getBasketTotal(this.tabletId);
        this.basketSize = this.basketService.getBasketSize(this.tabletId);
      });
    });
  }

  redirectToConfirmation() {
    this.router.navigate(['/confirmation', this.tabletId]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '40vh',
      height: '35vh',
      data: { title: 'Reset order',
              question: 'Are you sure?',
              message: 'You will lose your basket',
              tabletId: this.tabletId,
              abort: false
      },
    });
  }
}

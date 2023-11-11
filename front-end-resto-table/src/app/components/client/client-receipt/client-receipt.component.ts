import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../../services/basket.service";
import {PaymentService} from "../../../services/payment.service";

@Component({
  selector: 'app-client-receipt',
  templateUrl: './client-receipt.component.html',
  styleUrls: ['./client-receipt.component.css']
})
export class ClientReceiptComponent implements OnInit {

  constructor(private router: Router, private basketService: BasketService,
              private route: ActivatedRoute,
              private paymentService: PaymentService) {}

  basketFinalTotalPrice = 0
  tabletId: string = "0";
  individualPayment: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      this.basketFinalTotalPrice = this.basketService.getBasketTotal(this.tabletId, true);
    });
    this.individualPayment = !this.paymentService.getGroupPayment();
  }

  redirectToEndPage() {
    this.paymentService.setPaid(this.tabletId);
    this.router.navigate(['/end', this.tabletId]);
  }

}

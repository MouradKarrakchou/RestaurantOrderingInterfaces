import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;
  orderNumber: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.time = new Date();

    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.route.params.subscribe((params) => {
      this.orderNumber = params['orderNumber'];
    });

    setTimeout(() => {
      this.router.navigate(['/idle'])
    }, 30000)
  }

}

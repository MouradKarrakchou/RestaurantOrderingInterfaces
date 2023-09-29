import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

}

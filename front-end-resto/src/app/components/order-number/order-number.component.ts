import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    setInterval(() => {
      this.router.navigate(['/idle'])
    }, 30000)
  }

}

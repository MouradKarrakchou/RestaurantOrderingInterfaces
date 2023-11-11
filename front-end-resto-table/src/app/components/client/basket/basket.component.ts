import { Component, OnInit } from '@angular/core';
import { DropUpAnimation } from "./animations";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  animations: [DropUpAnimation]
})
export class BasketComponent implements OnInit {

  isOpen = false;

  ngOnInit(): void {
  }

}

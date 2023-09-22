import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "./animations";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  animations: [DropDownAnimation]
})
export class BasketComponent implements OnInit {

  isOpen = false;

  ngOnInit(): void {
  }

}

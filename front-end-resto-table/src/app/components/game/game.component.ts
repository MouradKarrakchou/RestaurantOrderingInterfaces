import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('alert') alert!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  OrderAgain() {
    this.alert.nativeElement.style.display = 'block';
  }

  orderAgain() {
    //TODO redirection to order again
  }

  cancel() {
    this.alert.nativeElement.style.display = 'none';
  }
}

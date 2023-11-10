import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../services/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('alert') alert!: ElementRef;
  @ViewChild('cookie') cookie!: ElementRef;

  tabletId: string = "0";

  constructor(private gameService: GameService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.tabletId = params['id'];
      });
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

  increment() {
    if (this.cookie.nativeElement.style.width == '70vh') {
      this.cookie.nativeElement.style.width = '65vh';
    } else {
      this.cookie.nativeElement.style.width = '70vh';
    }
    this.cookie.nativeElement.style.height = 'auto';
    this.cookie.nativeElement.style.transform += 'rotate(10deg)';
    this.gameService.click(this.tabletId);
  }
}

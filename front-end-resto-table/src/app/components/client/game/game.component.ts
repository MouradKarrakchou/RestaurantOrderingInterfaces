import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../../services/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService, UserTabletState} from "../../../services/state.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('alert') alert!: ElementRef;
  @ViewChild('cookie') cookie!: ElementRef;

  tabletId: string = "0";
  score: number = 0;

  constructor(private gameService: GameService,
              private stateService: StateService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.tabletId = params['id'];
          this.score = this.gameService.getScore(this.tabletId);
      });
      this.score = this.gameService.getScore(this.tabletId);
  }

  OrderAgain() {
    this.alert.nativeElement.style.display = 'block';
  }

  orderAgain() {
    //TODO redirection to order again
    this.stateService.setUserTabletState(this.tabletId,UserTabletState.OrderAgain)
    this.router.navigate(['/home',this.tabletId]);

  }

  cancel() {
    this.alert.nativeElement.style.display = 'none';
  }

  increment() {
    this.score++;
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

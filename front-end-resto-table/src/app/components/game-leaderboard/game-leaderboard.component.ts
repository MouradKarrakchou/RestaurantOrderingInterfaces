import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {PlayerScore} from "../../models/PlayerScore";
import {Router} from "@angular/router";
import {StateService, UserTabletState} from "../../services/state.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-game-leaderboard',
  templateUrl: './game-leaderboard.component.html',
  styleUrls: ['./game-leaderboard.component.css']
})
export class GameLeaderboardComponent implements OnInit {
  leaderboard: PlayerScore[] = [];

  constructor(private gameService: GameService, private router: Router,
              private state: StateService,
              private basketService: BasketService) { }

  ngOnInit(): void {
    this.fetchLeaderboard();
    // setInterval(() => {
    //   this.fetchLeaderboard();
    // }, 1000);
  }

  redirectToSleepMode() {
    this.basketService.getAllTabletteActivated().forEach((tabletId) => {
      this.state.setUserTabletState(tabletId.toString(), UserTabletState.Sleep);
    });
    this.router.navigate(['/sleep-mode']);
  }

  fetchLeaderboard() {
    this.leaderboard = this.gameService.getLeaderboard();
  }

  getMedalNameByRank(rank: number) {
    switch (rank) {
      case 1:
        return 'gold_medal';
      case 2:
        return 'silver_medal';
      case 3:
        return 'bronze_medal';
      default:
        return 'donkey_medal';
    }
  }
}

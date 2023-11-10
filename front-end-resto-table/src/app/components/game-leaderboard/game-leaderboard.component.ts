import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {PlayerScore} from "../../models/PlayerScore";

@Component({
  selector: 'app-game-leaderboard',
  templateUrl: './game-leaderboard.component.html',
  styleUrls: ['./game-leaderboard.component.css']
})
export class GameLeaderboardComponent implements OnInit {
  leaderboard: PlayerScore[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.fetchLeaderboard();
    setInterval(() => {
      this.fetchLeaderboard();
    }, 100);
  }

  fetchLeaderboard() {
    this.leaderboard = this.gameService.getLeaderboard();
    // console.log(this.leaderboard);
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

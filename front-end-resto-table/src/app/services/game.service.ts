import {Injectable} from "@angular/core";
import {PlayerScore} from "../models/PlayerScore";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  scores: { [key: string]: number } = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
  }

  click(tabletId: string) {
    this.scores[tabletId]++;
  }

  getScore(tabletId: string) {
    return this.scores[tabletId];
  }

  getLeaderboard() {
    let leaderboard: PlayerScore[] = [];
    const sortedScores = Object.entries(this.scores).sort((a, b) => b[1] - a[1]);
    sortedScores.forEach((score, index, array) => {
      const previousScore = array[index - 1] ? array[index - 1][1] : null;
      const currentRank = previousScore === score[1] ? leaderboard[leaderboard.length-1].rank : index + 1;
      leaderboard.push(new PlayerScore(currentRank, score[0], score[1]));
    });
    return leaderboard;
  }
}

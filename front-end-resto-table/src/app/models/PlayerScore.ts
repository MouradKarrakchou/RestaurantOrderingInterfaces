export class PlayerScore {
  rank: number;
  tabletId: string;
  score: number;

  constructor(rank: number, tabletId: string, score: number) {
    this.rank = rank;
    this.tabletId = tabletId;
    this.score = score;
  }
}

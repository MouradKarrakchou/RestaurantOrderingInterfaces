export class KitchenItem {
  id: string;
  shortName: string;
  souldStartAt: Date;
  startedAt: Date;
  finishedAt: Date;

  constructor(id: string, shortName: string, souldStartAt: Date, startedAt: Date, finishedAt: Date) {
    this.id = id;
    this.shortName = shortName;
    this.souldStartAt = souldStartAt;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
  }
}

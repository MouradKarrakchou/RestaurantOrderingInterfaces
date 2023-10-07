import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  private callToBff: boolean = false;
  constructor() { }

  public isBFF(): boolean {
    return this.callToBff;
  }

  public setCallToBff(callToBff: boolean): void {
    this.callToBff = callToBff;
  }

  public switchBFF(): boolean {
    this.callToBff = !this.callToBff;
    return this.callToBff;
  }
}

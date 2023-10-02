import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  private callToBff: boolean = false;
  constructor() { }

  public getCallToBff(): boolean {
    return this.callToBff;
  }

  public setCallToBff(callToBff: boolean): void {
    this.callToBff = callToBff;
  }
}

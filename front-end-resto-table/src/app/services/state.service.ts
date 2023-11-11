import { Injectable } from '@angular/core';

export enum UserTabletState {
  Idle = 'Idle', // Before starting the order
  Normal = 'Normal', // Order
  OrderAgain = 'OrderAgain', //Ordering again
  Prevalidated = 'Prevalidated', // /order-number
  Game = 'Game', // /game
  Sleep = 'Sleep', // no route needed
  Final = 'Final', // /client-receipt
  Billed = 'Billed', // /end
}

export enum MiddleTabletState {
  Idle = 'Idle', // /idle
  Config = 'Config', // /middle-table
  Preorder = 'Preorder', // /summary
  Waiting = 'Status', // /waiting-screen
  Sleep = 'Sleep', // /sleep-mode
  Final = 'Final', // /summary
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private middleTabletState: MiddleTabletState = MiddleTabletState.Idle;

  userTabletStates: { [key: string]: UserTabletState } = {
    '1': UserTabletState.Idle,
    '2': UserTabletState.Idle,
    '3': UserTabletState.Idle,
    '4': UserTabletState.Idle,
  };

  constructor() { }

  getUserTabletState(tabletId: string): UserTabletState {
    return this.userTabletStates[tabletId];
  }

  getMiddleTabletState(): MiddleTabletState {
    return this.middleTabletState;
  }

  setUserTabletState(tabletId: string, newState: UserTabletState) {
    this.userTabletStates[tabletId] = newState;
  }

  setMiddleTabletState(newState: MiddleTabletState) {
    this.middleTabletState = newState;
  }

  setAllUserTabletState(state: UserTabletState) {
    for (const key in this.userTabletStates) {
      this.userTabletStates[key] = state;
    }
  }
}

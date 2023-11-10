import { Injectable } from '@angular/core';

export enum UserTabletState {
  Idle = 'Idle', // Before starting the order
  Normal = 'Normal', // Order
  Sleep = 'Sleep', // TODO: no route needed (after order served)
  Final = 'Final', // TODO: /client-receipt (after click on payment on middle tablet)
}

export enum MiddleTabletState {
  Idle = 'Idle', // /idle
  Config = 'Config', // /middle-table
  Preorder = 'Preorder', // /summary
  Waiting = 'Status', // TODO: /wait (after confirm first order)
  Sleep = 'Sleep', // TODO: /sleep-mode (after order served)
  Final = 'Final', // TODO: /global-receipt (after click on payment)
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
}

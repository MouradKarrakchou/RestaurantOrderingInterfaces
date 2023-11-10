import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {MiddleTabletState, StateService, UserTabletState} from "../../services/state.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.css']
})
export class TableViewerComponent implements OnInit {


  middleState: string = MiddleTabletState.Idle;
  tabletStates: string[] = ["Idle", "Idle", "Idle", "Idle"];

  constructor(private router: Router,
              private stateService: StateService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      this.tabletStates[i] = this.stateService.getUserTabletState((i+1).toString());
    }
    this.middleState = this.stateService.getMiddleTabletState();
  }


  changeTablet(number: number) {
    if (number == 0){
      let state = this.stateService.getMiddleTabletState();
      switch (state) {
        case MiddleTabletState.Idle:
          this.router.navigate(['/idle', number]);
          break;
        case MiddleTabletState.Config:
          this.router.navigate(['/middle-table']);
          break;
        case MiddleTabletState.Preorder:
          this.router.navigate(['/summary', number]);
          break;
        case MiddleTabletState.Waiting:
          this.router.navigate(['/waiting-screen']);
          break;
        case MiddleTabletState.Sleep:
          this.router.navigate(['/sleep-mode']);
          break;
        case MiddleTabletState.Final:
          this.router.navigate(['/summary', number]);
          break;
      }
    }
    else{
      let state = this.stateService.getUserTabletState(number.toString());
      switch (state) {
        case UserTabletState.Idle:
          this.router.navigate(['/idle', number]);
          break;
        case UserTabletState.Normal:
          this.router.navigate(['/home', number]);
          break;
        case UserTabletState.Prevalidated:
          this.router.navigate(['/order-number', number]);
          break;
        case UserTabletState.Game:
          this.router.navigate(['/game', number]);
          break;
        case UserTabletState.Sleep:
          this._snackBar.open("This tablet is off", "Close", {
            duration: 5000,
          });
          break;
        case UserTabletState.Final:
          this.router.navigate(['/client-receipt', number]);
          break;
      }
    }
  }
}

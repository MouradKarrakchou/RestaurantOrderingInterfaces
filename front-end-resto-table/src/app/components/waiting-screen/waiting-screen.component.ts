import { Component, OnInit } from '@angular/core';
import {MiddleTabletState, StateService, UserTabletState} from "../../services/state.service";
import {BasketService} from "../../services/basket.service";
import {Router} from "@angular/router";
import preparationStatus from "../../models/PreparationStatus";

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.css']
})
export class WaitingScreenComponent implements OnInit {
  time = new Date();

  constructor(private state: StateService, private basketService: BasketService, private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.state.setMiddleTabletState(MiddleTabletState.Waiting);
    this.basketService.getAllTabletteActivated().forEach((tabletId) => {
      this.state.setUserTabletState(tabletId.toString(), UserTabletState.Game);
    });
  }

  redirectToSleepMode() {
    this.basketService.getAllTabletteActivated().forEach((tabletId) => {
      this.state.setUserTabletState(tabletId.toString(), UserTabletState.Sleep);
    });
    this.router.navigate(['/sleep-mode']);
  }

}

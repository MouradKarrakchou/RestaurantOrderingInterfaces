import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MiddleTabletState, StateService, UserTabletState} from "../../services/state.service";

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.css']
})
export class IdleComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private state: StateService) {}

  tabletId: string = "0";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      if ( this.tabletId == "0") {
        this.state.setMiddleTabletState(MiddleTabletState.Idle);
      } else {
        this.state.setUserTabletState(this.tabletId, UserTabletState.Idle);
      }
    });
  }

  redirectToStartPage() {
    if (this.tabletId == "0") {
      this.router.navigate(['/middle-table']);
    }
  }
}

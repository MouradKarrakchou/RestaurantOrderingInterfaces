import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../../services/payment.service";
import {MiddleTabletState, StateService, UserTabletState} from "../../../services/state.service";

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  idleTimeout: NodeJS.Timeout | undefined;
  tabletId: string = "0";
  time: Date | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private paymentService: PaymentService,
              private state: StateService)
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];

      this.time = new Date();

      setInterval(() => {
        this.time = new Date();
      }, 1000);

      if (this.tabletId == "0") {
        this.state.setMiddleTabletState(MiddleTabletState.Idle);
        this.idleTimeout = setTimeout(() => {
          this.router.navigate(['/idle', this.tabletId])
        }, 15000);
      } else {
        this.state.setUserTabletState(this.tabletId, UserTabletState.Billed);
        if (this.paymentService.everyonePaid) {
          this.state.setAllUserTabletState(UserTabletState.Idle);
          this.state.setMiddleTabletState(MiddleTabletState.Idle);
          this.idleTimeout = setTimeout(() => {
            this.router.navigate(['/idle', this.tabletId])
          }, 15000);
        }
      }
    });
  }

}

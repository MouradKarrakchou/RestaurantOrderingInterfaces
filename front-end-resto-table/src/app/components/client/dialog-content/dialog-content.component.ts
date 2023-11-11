import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BasketService} from "../../../services/basket.service";
import {Router} from "@angular/router";
import {MiddleTabletState, StateService, UserTabletState} from "../../../services/state.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private basketService: BasketService,
    private state: StateService,
  ) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    console.log(this.data.tabletId);
    if (this.data.abort) {
      this.basketService.emptyAllBaskets();
      this.state.setMiddleTabletState(MiddleTabletState.Idle);
      this.state.setAllUserTabletState(UserTabletState.Idle);
      this.router.navigate(['/idle', 0]);
      this.dialogRef.close(true);
    } else {
      this.basketService.emptyBasket(this.data.tabletId);
      this.router.navigate(['/home', this.data.tabletId]);
      this.dialogRef.close(true);
    }
  }

}

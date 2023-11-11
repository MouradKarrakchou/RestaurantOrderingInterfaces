import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BasketService} from "../../../services/basket.service";
import {Router} from "@angular/router";

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
    private basketService: BasketService
  ) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    console.log(this.data.tabletId);
    this.basketService.emptyBasket(this.data.tabletId);
    this.router.navigate(['/home', this.data.tabletId]);
    this.dialogRef.close(true);
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {MiddleTabletState, StateService, UserTabletState} from "../../services/state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-middle-table',
  templateUrl: './middle-table.component.html',
  styleUrls: ['./middle-table.component.css']
})
export class MiddleTableComponent implements OnInit {
  @ViewChild('tab1') tab1!: ElementRef;
  @ViewChild('tab2') tab2!: ElementRef;
  @ViewChild('tab3') tab3!: ElementRef;
  @ViewChild('tab4') tab4!: ElementRef;

  tab1Selected: boolean = false;
  tab2Selected: boolean = false;
  tab3Selected: boolean = false;
  tab4Selected: boolean = false;

  @ViewChild('together') together!: ElementRef;
  @ViewChild('separately') separately!: ElementRef;

  paymentMethodSelected: string = "";

  @ViewChild('validate') validate!: ElementRef;

  constructor(private basketService: BasketService,
              private states: StateService,
              private router: Router) { }

  ngOnInit(): void {
    this.states.setMiddleTabletState(MiddleTabletState.Config);
  }

  selectTab(tabNumber: string) {
    switch (tabNumber) {
      case 'tab1':
        this.tab1.nativeElement.style.background = this.tab1.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        this.tab1Selected = !this.tab1Selected;
        break;
      case 'tab2':
        this.tab2.nativeElement.style.background = this.tab2.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        this.tab2Selected = !this.tab2Selected;
        break;
      case 'tab3':
        this.tab3.nativeElement.style.background = this.tab3.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        this.tab3Selected = !this.tab3Selected;
        break;
      case 'tab4':
        this.tab4.nativeElement.style.background = this.tab4.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        this.tab4Selected = !this.tab4Selected;
        break;
    }
    this.checkValidation();
  }

  selectPaymentMethod(paymentMethod: string) {
    if (this.together.nativeElement.style.background == ''
      && this.separately.nativeElement.style.background == '') {
      switch (paymentMethod) {
        case 'together': this.together.nativeElement.style.background = 'rgb(114, 192, 114)'; break;
        case 'separately': this.separately.nativeElement.style.background = 'rgb(114, 192, 114)'; break;
      }
    }
    else if ((this.together.nativeElement.style.background == 'rgb(114, 192, 114)'
      || this.together.nativeElement.style.background == '')
      && (this.separately.nativeElement.style.background == 'rgb(169, 169, 169)'
      || this.separately.nativeElement.style.background == '')
      && paymentMethod != this.paymentMethodSelected) {
      console.log("else if")
      this.together.nativeElement.style.background = 'rgb(169, 169, 169)';
      this.separately.nativeElement.style.background = 'rgb(114, 192, 114)';
    }
    else if (this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
      && this.separately.nativeElement.style.background == 'rgb(114, 192, 114)'
      && paymentMethod != this.paymentMethodSelected) {
      console.log("else if 2")
      this.together.nativeElement.style.background = 'rgb(114, 192, 114)';
      this.separately.nativeElement.style.background = 'rgb(169, 169, 169)';
    }

    this.paymentMethodSelected = paymentMethod;
    this.checkValidation();
  }

  validateSelection() {
    if ((this.tab1Selected || this.tab2Selected || this.tab3Selected || this.tab4Selected)
      && this.paymentMethodSelected != '') {
      if (this.tab1Selected) {
        this.basketService.setSelectedTable("1");
        this.states.setUserTabletState("1", UserTabletState.Normal);
      } else {
        this.states.setUserTabletState("1", UserTabletState.Sleep);
      }
      if (this.tab2Selected) {
        this.basketService.setSelectedTable("2");
        this.states.setUserTabletState("2", UserTabletState.Normal);
      } else {
        this.states.setUserTabletState("2", UserTabletState.Sleep);
      }
      if (this.tab3Selected) {
        this.basketService.setSelectedTable("3");
        this.states.setUserTabletState("3", UserTabletState.Normal);
      } else {
        this.states.setUserTabletState("3", UserTabletState.Sleep);
      }
      if (this.tab4Selected) {
        this.basketService.setSelectedTable("4");
        this.states.setUserTabletState("4", UserTabletState.Normal);
      } else {
        this.states.setUserTabletState("4", UserTabletState.Sleep);
      }
      //TODO remember payment method
      this.router.navigate(['/summary', '0']);
    }
  }

  checkValidation() {
    if ((this.tab1Selected || this.tab2Selected || this.tab3Selected || this.tab4Selected)
      && this.paymentMethodSelected != '') {
      this.validate.nativeElement.style.background = 'rgb(114, 192, 114)';
      return true;
    } else {
      this.validate.nativeElement.style.background = 'rgb(169, 169, 169)';
    }
    return false;
  }

}

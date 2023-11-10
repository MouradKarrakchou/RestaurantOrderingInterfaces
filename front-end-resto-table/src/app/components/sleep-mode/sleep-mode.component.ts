import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MiddleTabletState, StateService, UserTabletState} from "../../services/state.service";
import {BasketService} from "../../services/basket.service";
import {Router} from "@angular/router";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-sleep-mode',
  templateUrl: './sleep-mode.component.html',
  styleUrls: ['./sleep-mode.component.css']
})
export class SleepModeComponent implements OnInit {
  @ViewChild('sleepMode') sleepMode!: ElementRef;

  @ViewChild('tab1') tab1!: ElementRef;
  @ViewChild('tab2') tab2!: ElementRef;
  @ViewChild('tab3') tab3!: ElementRef;
  @ViewChild('tab4') tab4!: ElementRef;

  tab1Selected: boolean = false;
  tab2Selected: boolean = false;
  tab3Selected: boolean = false;
  tab4Selected: boolean = false;

  powerUp: boolean = false;

  @ViewChild('black') black!: ElementRef;

  @ViewChild('together') together!: ElementRef;
  @ViewChild('separately') separately!: ElementRef;

  paymentMethodSelected: string = "";

  allTabletsActivated: number[] = [];

  @ViewChild('validate') validate!: ElementRef;

  constructor(private state: StateService, private basketService: BasketService, private router: Router, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.state.setMiddleTabletState(MiddleTabletState.Sleep);
    this.tab1Selected = this.state.getUserTabletState('1') == UserTabletState.Normal;
    this.tab2Selected = this.state.getUserTabletState('2') == UserTabletState.Normal;
    this.tab3Selected = this.state.getUserTabletState('3') == UserTabletState.Normal;
    this.tab4Selected = this.state.getUserTabletState('4') == UserTabletState.Normal;
    this.allTabletsActivated = this.basketService.getAllTabletteActivated();
  }

  selectTab(tabNumber: string) {
    //TODO: reorder on tablet
    if (this.powerUp) {
      switch (tabNumber) {
        case 'tab1':
          this.tab1Selected = !this.tab1Selected;
          this.state.setUserTabletState('1', this.tab1Selected ? UserTabletState.Normal : UserTabletState.Sleep);
          break;
        case 'tab2':
          this.tab2Selected = !this.tab2Selected;
          this.state.setUserTabletState('2', this.tab2Selected ? UserTabletState.Normal : UserTabletState.Sleep);
          break;
        case 'tab3':
          this.tab3Selected = !this.tab3Selected;
          this.state.setUserTabletState('3', this.tab3Selected ? UserTabletState.Normal : UserTabletState.Sleep);
          break;
        case 'tab4':
          this.tab4Selected = !this.tab4Selected;
          this.state.setUserTabletState('4', this.tab4Selected ? UserTabletState.Normal : UserTabletState.Sleep);
          break;
      }
    }
  }

  selectPaymentMethod(paymentMethod: string) {
    if (this.powerUp) {if ((this.together.nativeElement.style.background == ''
      && this.separately.nativeElement.style.background == '')
      || (this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
        && this.separately.nativeElement.style.background == 'rgb(169, 169, 169)')
      || (this.together.nativeElement.style.background == ''
        && this.separately.nativeElement.style.background == 'rgb(169, 169, 169)')
      || (this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
        && this.separately.nativeElement.style.background == '')) {
      console.log("if")
      switch (paymentMethod) {
        case 'together':
          this.together.nativeElement.style.background = 'rgb(112, 147, 112)';
          this.paymentService.setGroupPayment(true);
          break;
        case 'separately':
          this.separately.nativeElement.style.background = 'rgb(112, 147, 112)';
          this.paymentService.setGroupPayment(false);
          break;
      }
      this.paymentMethodSelected = paymentMethod;
    }
    else if (this.together.nativeElement.style.background == 'rgb(112, 147, 112)'
      && paymentMethod == this.paymentMethodSelected) {
      this.together.nativeElement.style.background = 'rgb(169, 169, 169)';
      this.paymentMethodSelected = '';
    }
    else if (this.separately.nativeElement.style.background == 'rgb(112, 147, 112)'
      && paymentMethod == this.paymentMethodSelected) {
      this.separately.nativeElement.style.background = 'rgb(169, 169, 169)';
      this.paymentMethodSelected = '';
    }
    else if ((this.together.nativeElement.style.background == 'rgb(112, 147, 112)'
        || this.together.nativeElement.style.background == '')
      && (this.separately.nativeElement.style.background == 'rgb(169, 169, 169)'
        || this.separately.nativeElement.style.background == '')
      && paymentMethod != this.paymentMethodSelected) {
      console.log("else if")
      this.together.nativeElement.style.background = 'rgb(169, 169, 169)';
      this.separately.nativeElement.style.background = 'rgb(112, 147, 112)';
      this.paymentMethodSelected = paymentMethod;

      } else if ((this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
              || this.together.nativeElement.style.background == '')
          && (this.separately.nativeElement.style.background == 'rgb(112, 147, 112)'
              || this.separately.nativeElement.style.background == '')
          && paymentMethod != this.paymentMethodSelected) {
        console.log("else if 2")
        this.together.nativeElement.style.background = 'rgb(112, 147, 112)';
        this.separately.nativeElement.style.background = 'rgb(169, 169, 169)';
        this.paymentMethodSelected = paymentMethod;
      }

      this.checkValidation();
    }
  }

  power() {
    if (this.powerUp) {
      this.black.nativeElement.style.opacity = '100%';
    } else {
      this.black.nativeElement.style.opacity = '0%';
    }
    this.powerUp = !this.powerUp;
  }

  validatePayment() {
    if (this.powerUp && this.checkValidation()) {
        this.state.setMiddleTabletState(MiddleTabletState.Final);
        this.basketService.getAllTabletteActivated().forEach((tabletId) => {
            this.state.setUserTabletState(tabletId.toString(), UserTabletState.Final);
        });
        this.router.navigate(['/summary/0']);
    }
  }

  checkValidation() {
    if (this.paymentMethodSelected == 'together' || this.paymentMethodSelected == 'separately') {
      this.validate.nativeElement.style.background = 'rgb(112, 147, 112)';
      return true;
    } else {
      this.validate.nativeElement.style.background = 'rgb(169, 169, 169)';
      return false;
    }
  }
}

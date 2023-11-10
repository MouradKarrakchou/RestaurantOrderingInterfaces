import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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

  @ViewChild('validate') validate!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tabNumber: string) {
    //TODO turn on/off the other tables
    switch (tabNumber) {
      case 'tab1':
        this.tab1.nativeElement.style.background = this.tab1.nativeElement.style.background == 'rgb(112, 147, 112)' ? 'rgb(169, 169, 169)' : 'rgb(112, 147, 112)';
        this.tab1Selected = !this.tab1Selected;
        break;
      case 'tab2':
        this.tab2.nativeElement.style.background = this.tab2.nativeElement.style.background == 'rgb(112, 147, 112)' ? 'rgb(169, 169, 169)' : 'rgb(112, 147, 112)';
        this.tab2Selected = !this.tab2Selected;
        break;
      case 'tab3':
        this.tab3.nativeElement.style.background = this.tab3.nativeElement.style.background == 'rgb(112, 147, 112)' ? 'rgb(169, 169, 169)' : 'rgb(112, 147, 112)';
        this.tab3Selected = !this.tab3Selected;
        break;
      case 'tab4':
        this.tab4.nativeElement.style.background = this.tab4.nativeElement.style.background == 'rgb(112, 147, 112)' ? 'rgb(169, 169, 169)' : 'rgb(112, 147, 112)';
        this.tab4Selected = !this.tab4Selected;
        break;
    }
  }

  selectPaymentMethod(paymentMethod: string) {
    if ((this.together.nativeElement.style.background == ''
      && this.separately.nativeElement.style.background == '')
      || (this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
        && this.separately.nativeElement.style.background == 'rgb(169, 169, 169)')
      || (this.together.nativeElement.style.background == ''
        && this.separately.nativeElement.style.background == 'rgb(169, 169, 169)')
      || (this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
        && this.separately.nativeElement.style.background == '')) {
      console.log("if")
      switch (paymentMethod) {
        case 'together': this.together.nativeElement.style.background = 'rgb(112, 147, 112)'; break;
        case 'separately': this.separately.nativeElement.style.background = 'rgb(112, 147, 112)'; break;
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
    }
    else if ((this.together.nativeElement.style.background == 'rgb(169, 169, 169)'
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

  power() {
    //TODO if turning off, then turn off all the other tables
    if (this.powerUp) {
      this.black.nativeElement.style.opacity = '100%';
    } else {
      this.black.nativeElement.style.opacity = '0%';
    }
    this.powerUp = !this.powerUp;
  }

  validatePayment() {
    //TODO redirection ?? Bill ??
  }

  checkValidation() {
    if (this.paymentMethodSelected == 'together' || this.paymentMethodSelected == 'separately') {
      this.validate.nativeElement.style.background = 'rgb(112, 147, 112)';
    } else {
      this.validate.nativeElement.style.background = 'rgb(169, 169, 169)';
    }
  }
}

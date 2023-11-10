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

  selectPaymentMethod(choice: string) {
    if (this.powerUp) {
      this.sleepMode.nativeElement.style.background = 'rgb(169, 169, 169)';
    }
    this.sleepMode.nativeElement.style.background = 'rgb(112, 147, 112)';
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

  orderAgain() {
    //TODO redirection
  }

  pay() {
    //TODO redirection
  }
}

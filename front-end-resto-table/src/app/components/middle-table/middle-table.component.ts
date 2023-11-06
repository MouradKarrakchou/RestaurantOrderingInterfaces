import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tabNumber: string) {
    switch (tabNumber) {
      case 'tab1':
        this.tab1.nativeElement.style.background = this.tab1.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        //boolean tkt != tkt
        break;
      case 'tab2':
        this.tab2.nativeElement.style.background = this.tab2.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        //boolean tkt != tkt
        break;
      case 'tab3':
        this.tab3.nativeElement.style.background = this.tab3.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        //boolean tkt != tkt
        break;
      case 'tab4':
        this.tab4.nativeElement.style.background = this.tab4.nativeElement.style.background == 'rgb(114, 192, 114)' ? 'rgb(169, 169, 169)' : 'rgb(114, 192, 114)';
        //boolean tkt != tkt
        break;
    }

  }

  selectPaymentMethod() {

  }

}

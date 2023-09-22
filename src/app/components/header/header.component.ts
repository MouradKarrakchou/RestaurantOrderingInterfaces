import {Component, OnInit,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category: string = "ALL";

  @Output() categoryEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitCategoryEvent(category: string) {
    this.category = category;
    this.categoryEvent.emit(category);
  }
}

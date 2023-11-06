import {Component, OnInit,EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category: string = "ALL";

  @Output() categoryEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  emitCategoryEvent(category: string) {
    this.category = category;
    this.categoryEvent.emit(category);
  }

  viewFullTable() {
    this.router.navigate(['/table-viewer'])
  }

  protected readonly print = print;
}

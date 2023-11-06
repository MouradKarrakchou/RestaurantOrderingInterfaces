import {Component, OnInit,EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category: string = "ALL";
  tabletId: string = "0";

  @Output() categoryEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
    });
  }

  emitCategoryEvent(category: string) {
    this.category = category;
    this.categoryEvent.emit(category);
  }

  viewFullTable() {
    this.router.navigate(['/table-viewer', this.tabletId])
  }

  protected readonly print = print;
}

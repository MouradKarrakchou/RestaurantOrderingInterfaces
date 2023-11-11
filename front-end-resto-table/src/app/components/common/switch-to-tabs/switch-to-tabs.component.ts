import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-switch-to-tabs',
  templateUrl: './switch-to-tabs.component.html',
  styleUrls: ['./switch-to-tabs.component.css']
})
export class SwitchToTabsComponent implements OnInit {

  tabletId: string = "0";

  @Output() categoryEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      if( this.tabletId == null) {
        this.tabletId = "0";
      }
    });
  }

  viewFullTable() {
    this.router.navigate(['/table-viewer'])
  }

}

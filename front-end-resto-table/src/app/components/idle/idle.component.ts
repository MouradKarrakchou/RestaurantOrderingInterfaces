import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.css']
})
export class IdleComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute) {}

  tabletId: string = "0";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
    });
  }

  redirectToStartPage() {
    if (this.tabletId == "0") {
      this.router.navigate(['/middle-table']);
    }
  }
}

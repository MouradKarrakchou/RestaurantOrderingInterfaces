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

  ngOnInit() {
  }

  redirectToHome() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.router.navigate(['/home', id]);
    });
  }
  viewFullTable() {
    this.router.navigate(['/table-viewer'])
  }
}

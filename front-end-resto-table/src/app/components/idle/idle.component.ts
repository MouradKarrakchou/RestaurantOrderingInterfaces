import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.css']
})
export class IdleComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
  viewFullTable() {
    this.router.navigate(['/table-viewer'])
  }
}

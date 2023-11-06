import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.css']
})
export class TableViewerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToHome() {
    this.router.navigate(['/home'])
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.css']
})
export class TableViewerComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  redirectToHome() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.router.navigate(['/home', id]);
    });
  }

  changeTablette(number: number) {
    if (number==0){
      this.router.navigate(['/middle-table/0/global-basket-summary']);
    }
    else{
      this.router.navigate(['/home', number]);
    }
  }
}

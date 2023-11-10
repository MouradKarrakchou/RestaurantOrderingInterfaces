import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  idleTimeout: NodeJS.Timeout | undefined;
  tabletId: string = "0";
  time: Date | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,)
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];

      this.time = new Date();

      setInterval(() => {
        this.time = new Date();
      }, 1000);

      this.idleTimeout = setTimeout(() => {
        this.router.navigate(['/idle', this.tabletId])
      }, 20000);
    });
  }

}

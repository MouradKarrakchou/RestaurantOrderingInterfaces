import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorie:string="";

  constructor() { }

  handleCustomEvent(data: string) {
    this.categorie = data;
  }

  ngOnInit(): void {
  }

  handleCategorieEvent(categorie: string) {
    this.categorie=categorie;
  }
}

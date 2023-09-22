import {Component, OnInit,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categorie: string=''
  @Output() categorieEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitCategorieEvnet(categorie: string) {
    this.categorie=categorie;
    this.categorieEvent.emit(categorie);
  }
}

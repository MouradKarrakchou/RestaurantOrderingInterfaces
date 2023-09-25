import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogContentComponent} from "../dialog-content/dialog-content.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogContentComponent, {
        width: '250px', // Vous pouvez personnaliser la largeur selon vos besoins
        data: {message: 'Êtes-vous sûr de vouloir annuler ?'} // Message de confirmation
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Le résultat sera true si l'utilisateur a confirmé
          // Ajoutez ici le code à exécuter si l'annulation est confirmée
        } else {
          // Le résultat sera false si l'utilisateur a annulé
          // Ajoutez ici le code à exécuter si l'annulation est annulée
        }
      });
    }

}

import {Component, OnInit} from '@angular/core';
import MenuItem from 'src/app/models/MenuItem';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  menuItems: MenuItem[] = [];
  selectedSortOption: string | undefined;

  ngOnInit(): void {
    this.initMenuItems();
  }

  constructor() { }

  initMenuItems(): void {
    this.fetchMenuItems()
      .then((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
        this.sortItems();
        console.log("Les menu items ont été récupérés :", menuItems);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
      });
  }

  async fetchMenuItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch("http://localhost:3000/menus"); // Assurez-vous que votre serveur est en cours d'exécution à l'adresse spécifiée

      const data = await response.json();

      // Convertir les données JSON en des objets MenuItem
      const menuItems: MenuItem[] = data.map((item: any) => {
        return new MenuItem(
          item.id,
          item.fullName,
          item.shortName,
          item.price,
          item.category,
          new URL(item.image)
        );
      });

      return menuItems;
    } catch (error) {
      // Gérer les erreurs de la requête
      console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
      throw error;
    }
  }

  // Fonction de tri appelée lorsque la sélection change
  sortItems() {
    switch (this.selectedSortOption) {
      case "nameAsc":
        this.menuItems.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case "nameDesc":
        this.menuItems.sort((a, b) => b.fullName.localeCompare(a.fullName));
        break;
      case "priceAsc":
        this.menuItems.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        this.menuItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }
}

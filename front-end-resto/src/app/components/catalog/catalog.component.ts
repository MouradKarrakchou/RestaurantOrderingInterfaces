import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import MenuItem from 'src/app/models/MenuItem';
import Category from "../../models/Category";
import {BasketService} from "../../services/basket.service";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit,OnChanges {

  @Input() inputCategory: string = "ALL";
  currentCategory: Category = Category.ALL;

  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];

  selectedSortOption: string | undefined;

  ngOnInit(): void {
    this.initMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputCategory'] != undefined && changes['inputCategory'].currentValue !== changes['inputCategory'].previousValue) {
      this.changeCategory(this.inputCategory as Category);
    }
  }

  constructor(private basketService : BasketService) { }

  initMenuItems(): void {
    this.fetchMenuItems()
      .then((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
        this.filteredMenuItems = menuItems;
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

      // Convertir les données JSON en une liste d'objets MenuItem
      return data.map((item: any) => {
        return new MenuItem(
          item.id,
          item.fullName,
          item.shortName,
          item.price,
          item.category,
          new URL(item.image)
        );
      });
    } catch (error) {
      // Gérer les erreurs de la requête
      console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
      throw error;
    }
  }

  changeCategory(category: Category) {
    this.currentCategory = category;
    this.updateFiltered();
    this.sortItems();
  }

  updateFiltered() {
    if (this.currentCategory === Category.ALL) {
      this.filteredMenuItems = this.menuItems;
    } else {
      this.filteredMenuItems = this.menuItems.filter((item) => item.category === this.currentCategory);
    }
  }

  // Fonction de tri appelée lorsque la sélection change
  sortItems() {
    switch (this.selectedSortOption) {
      case "nameAsc":
        this.filteredMenuItems.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case "nameDesc":
        this.filteredMenuItems.sort((a, b) => b.fullName.localeCompare(a.fullName));
        break;
      case "priceAsc":
        this.filteredMenuItems.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        this.filteredMenuItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  setSortOption(option: string) {
    this.selectedSortOption = option;
    this.sortItems();
  }

  addItemToBasket(item: MenuItem) {
    this.basketService.addToBasket(item);
  }
}

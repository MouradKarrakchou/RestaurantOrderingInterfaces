import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import MenuItem from 'src/app/models/MenuItem';
import Category from "../../models/Category";
import {BasketService} from "../../services/basket.service";
import {formatCurrency} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";


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
  trendingItems: MenuItem[]=[];
  trendingCategoryItem: MenuItem[]=[];
  trendingCategoryItemPrice: number = 0;

  tabletId: string = '0';

  selectedSortOption: string | undefined;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tabletId = params['id'];
      this.initMenuItems();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputCategory'] != undefined && changes['inputCategory'].currentValue !== changes['inputCategory'].previousValue) {
      this.changeCategory(this.inputCategory as Category);
    }
  }

  constructor(private basketService : BasketService,
              private http: HttpClient,
              private route: ActivatedRoute) {
  }

  async initMenuItems(): Promise<void> {
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
      this.fetchTrendingItems()
        .then((menuItems: MenuItem[]) => {
          this.trendingItems = menuItems;
          console.log("Les trending items ont été récupérés :", menuItems);
        })
        .catch((error) => {
          console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
        });

      this.fetchTrendingCategoryItems()
        .then((menuItems: MenuItem[]) => {
          this.trendingCategoryItem = menuItems;
          this.trendingCategoryItem.sort((a, b) => b.category.localeCompare(a.category));
          console.log("Les trending category items ont été récupérés :", menuItems);
        })
        .catch((error) => {
          console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
        });
  }

  async fetchMenuItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch("http://localhost:3000/menus");

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

  async fetchTrendingItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch("http://localhost:8080/api/preference");

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

  async fetchTrendingCategoryItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch("http://localhost:8080/api/preference/by-category");

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
    } else if (this.currentCategory === Category.TREND) {
      this.filteredMenuItems = this.trendingCategoryItem;
      this.trendingCategoryItemPrice = this.filteredMenuItems.reduce((sum, product) => sum + product.price, 0)
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
    this.basketService.addToBasket(this.tabletId, item);
  }

  addFullMenu() {
    this.filteredMenuItems.forEach(item => this.basketService.addToBasket(this.tabletId, item));
  }

  protected readonly formatCurrency = formatCurrency;
}

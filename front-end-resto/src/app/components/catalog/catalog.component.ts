import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import MenuItem from 'src/app/models/MenuItem';
import Category from "../../models/Category";
import {BasketService} from "../../services/basket.service";
import {formatCurrency} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {TableOrderDTO} from "../../models/TableOrderDTO";
import {OrderingItemDTO} from "../../models/OrderingItemDTO";
import {ItemQuantity} from "../../models/ItemQuantity";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit,OnChanges {

  @Input() inputCategory: string = "ALL";
  currentCategory: Category = Category.ALL;

  private menuBaseUrlHostAndPort: string="http://localhost:3000";
  private diningBaseUrlHostAndPort: string="http://localhost:3001";

  private bffMode=false;


  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  trendingItems: MenuItem[]=[];
  trendingItemPrice: number = 0;


  selectedSortOption: string | undefined;

  ngOnInit(): void {
    console.log("initialising")
    this.initMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputCategory'] != undefined && changes['inputCategory'].currentValue !== changes['inputCategory'].previousValue) {
      this.changeCategory(this.inputCategory as Category);
    }
  }

  constructor(private basketService : BasketService, private http: HttpClient) {

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
    if (this.bffMode) {
      this.fetchTrendingItems()
        .then((menuItems: MenuItem[]) => {
          this.trendingItems = menuItems;
          console.log("Les trending items ont été récupérés :", menuItems);
        })
        .catch((error) => {
          console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
        });
    } else {
      this.trendingItems = await this.retrieveMostSoldItems(3);
      console.log("TRENDING ITEMS")
      console.log(this.trendingItems);
      let map=await this.retrieveMostSoldByCategories();
      console.log(map);
    }

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
      const response = await fetch("http://localhost:8080/api/preference"); // Assurez-vous que votre serveur est en cours d'exécution à l'adresse spécifiée

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
      //this.filteredMenuItems = this.trendingItems;
      this.filteredMenuItems = this.menuItems.splice(0,4);
      this.trendingItemPrice = this.filteredMenuItems.reduce((sum, product) => sum + product.price, 0)
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

  addFullMenu() {
    this.filteredMenuItems.forEach(item => this.basketService.addToBasket(item));
  }





  async findByID(id: string): Promise<MenuItem> {
    try {
      console.log(`Ask Menu service for the item with id: ${id}`);
      const response = await fetch(`${this.menuBaseUrlHostAndPort}/menus/${id}`);
      if (response.ok) {
        const menuItem: MenuItem = await response.json();
        return menuItem;
      } else {
        throw new Error('Order service is unavailable');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Order service is unavailable');
    }
  }

  findAllMenuItems(): Promise<MenuItem[]> {
    const apiUrl = `${this.menuBaseUrlHostAndPort}/menus`;
    console.log('Ask the menu service for all menu items');

    return this.http.get<MenuItem[]>(apiUrl)
      .toPromise()
      .then(response => response as MenuItem[])
      .catch(error => {
        console.error(error);
        throw new Error('The menu service is not available');
      });
  }
  getAllTableOrders(): Promise<TableOrderDTO[]> {
    const apiUrl = `${this.diningBaseUrlHostAndPort}/tableOrders`;
    console.log('Requesting Dining service to get all table orders.');

    return this.http.get<TableOrderDTO[]>(apiUrl)
      .toPromise()
      .then(response => response as TableOrderDTO[])
      .catch(error => {
        console.error(error);
        throw new Error('Dining service is unavailable.');
      });
  }

  async retrieveMostSoldItems(numberOfEntries: number): Promise<MenuItem[]> {
    try {
      const entryList: [OrderingItemDTO, number][] = await this.retrieveAllItemRanking();
      console.log('Retrieving the most sold items');
      console.log(entryList)

      const mostSoldItems: MenuItem[] = [];
      for (let i = 0; i < numberOfEntries; i++) {
        if (i>= entryList.length) {
          break;
        }
        const menuItem: MenuItem = await this.findByID(entryList[i][0].id);
        mostSoldItems.push(menuItem);
      }
      return mostSoldItems;
    } catch (error) {
      console.error(error);
      throw new Error('Dining service or order service is unavailable');
    }
  }

  async getMenuHashMap(): Promise<Map<string, MenuItem>> {
    try {
      const menuItems: MenuItem[] = await this.findAllMenuItems();
      console.log('Retrieving menu items');

      const hashMap: Map<string, MenuItem> = new Map();
      for (const menuItem of menuItems) {
        hashMap.set(menuItem.id, menuItem);
      }
      return hashMap;
    } catch (error) {
      console.error(error);
      throw new Error('Dining service or order service is unavailable');
    }
  }

  async retrieveMostSoldByCategories(): Promise<Map<Category, MenuItem>> {
    try {
      const entryList: [OrderingItemDTO, number][] = await this.retrieveAllItemRanking();
      console.log('Calculating the most sold item by category');

      const hashMapMenuItems: Map<string, MenuItem> = await this.getMenuHashMap();
      const hashMapCategories: Map<Category, ItemQuantity> = new Map();

      // Finding the most sold item for each category
      for (const entry of entryList) {
        let menuItem = hashMapMenuItems.get(entry[0].id);
        if (menuItem) {
        const category: Category = menuItem.category;
        let itemQuantity = hashMapCategories.get(category);

        if (itemQuantity) {
          if (itemQuantity.quantity < entry[1]) {
            hashMapCategories.set(category, new ItemQuantity(menuItem, entry[1]));
          }
        } else {
          hashMapCategories.set(category, new ItemQuantity(menuItem, entry[1]));
        }}
      }

      // Convert the map to a map linking the category to the most sold item
      const hashMap: Map<Category, MenuItem> = new Map();
      hashMapCategories.forEach((itemQuantity, category) => {
        hashMap.set(category, itemQuantity.menuItem);
      });

      return hashMap;
    } catch (error) {
      console.error(error);
      throw new Error('Dining service or order service is unavailable');
    }
  }

  async retrieveAllItemRanking(): Promise<[OrderingItemDTO, number][]> {
    try {
      console.log('Calculating all item ranking');

      const hashMap: Map<OrderingItemDTO, number> = new Map();
      const tableOrders: TableOrderDTO[] = await this.getAllTableOrders();

      tableOrders.forEach(tableOrder => {
        tableOrder.lines.forEach(orderingLine => {
          const item: OrderingItemDTO = orderingLine.item;
          const howMany: number = orderingLine.howMany;

          if (hashMap.has(item)) {
            hashMap.set(item, hashMap.get(item)! + howMany);
          } else {
            hashMap.set(item, howMany);
          }
        });
      });

      // Convert the Map to an array of key-value pairs and sort it by value in descending order
      const entryList: [OrderingItemDTO, number][] = Array.from(hashMap.entries());
      entryList.sort((a, b) => b[1] - a[1]);

      return entryList;
    } catch (error) {
      console.error(error);
      throw new Error('Dining service is unavailable');
    }
  }



  protected readonly formatCurrency = formatCurrency;
}

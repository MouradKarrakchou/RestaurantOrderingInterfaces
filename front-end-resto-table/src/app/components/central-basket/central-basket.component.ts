import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import MenuItem from "../../models/MenuItem";
import {KitchenPreparationStatus} from "../../models/KitchenPreparationStatus";
import basketItem from "../../models/BasketItem";
import {KitchenItem} from "../../models/KitchenItem";

@Component({
  selector: 'app-central-basket',
  templateUrl: './central-basket.component.html',
  styleUrls: ['./central-basket.component.css']
})
export class CentralBasketComponent implements OnInit {
  preparationStatus: KitchenPreparationStatus[] = [];

  constructor(private basketService: BasketService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.displayOrderStatus();
    setInterval(() => {
      this.displayOrderStatus();
    }, 5000);
  }

  displayOrderStatus() {
    this.getOrderStatus().then((data) => {
      console.log(data);
      this.preparationStatus = data;
    });
  }

  getCategoryText(category: string): string {
    switch (category) {
      case 'BAR':
        return 'Drinks';
      case 'COLD_DISH':
        return 'Cold dishes';
      case 'HOT_DISH':
        return 'Hot dishes';
      default:
        return 'Error';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'NOT_STARTED':
        return 'Not started';
      case 'IN_PROGRESS':
        return 'In progress';
      case 'FINISHED':
        return 'Finished';
      default:
        return 'Error';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'NOT_STARTED':
        return 'red';
      case 'IN_PROGRESS':
        return 'orange';
      case 'FINISHED':
        return 'green';
      default:
        return 'black';
    }
  }

  getCategoryIconText(category: string): string {
    switch (category) {
      case 'BAR':
        return 'local_bar';
      case 'COLD_DISH':
        return 'ac_unit';
      case 'HOT_DISH':
        return 'soup_kitchen';
      default:
        return 'Error';
    }
  }

  async getOrderStatus(): Promise<KitchenPreparationStatus[]> {
    try {
      const response = await fetch("http://localhost:8080/api/connected-table/status/" + BasketService.TABLE_NUMBER,
        {
          method: "GET",
        });

      const data = await response.json();

      // Convertir les données JSON en une liste d'objets MenuItem
      return data.map((item: any) => {
        return new KitchenPreparationStatus(
          item.id,
          item.completedAt,
          item.takenForServiceAt,
          item.post,
          item.status,
          item.preparedItems.map((item: any) => {
            return new KitchenItem(
                item.shortName,
                item.howMany,
            );
          })
        );
      });
    } catch (error) {
      // Gérer les erreurs de la requête
      console.error("Une erreur s'est produite lors de la récupération des menu items :", error);
      throw error;
    }
  }

}

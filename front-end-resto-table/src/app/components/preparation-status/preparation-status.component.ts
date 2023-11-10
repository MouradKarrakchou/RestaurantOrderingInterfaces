import { Component, OnInit } from '@angular/core';
import {KitchenPreparationStatus} from "../../models/KitchenPreparationStatus";
import {BasketService} from "../../services/basket.service";
import {HttpClient} from "@angular/common/http";
import {KitchenItem} from "../../models/KitchenItem";
import PreparationStatus from "../../models/PreparationStatus";
import PreparationCategory from "../../models/PreparationCategory";

@Component({
  selector: 'app-preparation-status',
  templateUrl: './preparation-status.component.html',
  styleUrls: ['./preparation-status.component.css']
})
export class PreparationStatusComponent implements OnInit {
  preparationStatus: KitchenPreparationStatus[] = [];

  constructor(private basketService: BasketService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.displayOrderStatus();
    // setInterval(() => {
    //   this.displayOrderStatus();
    // }, 5000);
  }

  displayOrderStatus() {
    this.getOrderStatus().then((data) => {
      console.log(data);
      this.preparationStatus = data;
    });
  }

  getCategoryText(category: string): string {
    switch (category) {
      case PreparationCategory.BAR:
        return 'Drinks';
      case PreparationCategory.COLD_DISH:
        return 'Cold dishes';
      case PreparationCategory.HOT_DISH:
        return 'Hot dishes';
      default:
        return 'Error';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case PreparationStatus.NOT_STARTED:
        return 'Not started';
      case PreparationStatus.IN_PROGRESS:
        return 'In progress';
      case PreparationStatus.FINISHED:
        return 'Finished';
      default:
        return 'Error';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case PreparationStatus.NOT_STARTED:
        return 'red';
      case PreparationStatus.IN_PROGRESS:
        return 'orange';
      case PreparationStatus.FINISHED:
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
      const response = await fetch("http://localhost:8080/api/connected-table/status/" + 1,
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

  protected readonly PreparationStatus = PreparationStatus;
}

import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SwitchService} from "../../services/switch.service";
import Table from "../../models/Table";
import {TableOrder} from "../../models/TableOrder";
import {StartOrdering} from "../../models/StartOrdering";
import {Item} from "../../models/Item";
import {Preparation} from "../../models/Preparation";
import {TableOrderInformation} from "../../models/TableOrderInformation";
import {OrderInformation} from "../../models/OrderInformation";
import {OrderIdService} from "../../services/order-id.service";

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.css'],
})
export class OrderNumberComponent implements OnInit {

  time: Date | undefined;
  orderNumber: string | undefined;
  shouldBeReadyAt: Date | undefined;

  orderInformation: OrderInformation | undefined;

  private diningBaseUrlHostAndPort: string = "http://localhost:3001";

  constructor(private router: Router,
              private basketService: BasketService,
              private http: HttpClient,
              private switchService: SwitchService,
              private orderIdService: OrderIdService) {
  }

  async ngOnInit(): Promise<void> {
    this.time = new Date();

    setInterval(() => {
      this.time = new Date();
    }, 1000);

    if (this.basketService.getBasketSize() !== 0) {
      if (this.switchService.isBFF()) {
        this.sendOrderToBFF().subscribe(orderInformation => {
          this.orderNumber = orderInformation.orderId;
          this.shouldBeReadyAt = new Date(orderInformation.shouldBeReadyAt);
          console.log(orderInformation);
          this.basketService.emptyBasket();
        });
      } else {
        this.orderInformation = await this.sendOrderToBackend();
        console.log("Order informations: ", this.orderInformation);
        this.orderNumber = this.orderInformation.orderId.toString();
        this.shouldBeReadyAt = this.orderInformation.shouldBeReadyAt;
        this.basketService.emptyBasket();
      }
    }

    setTimeout(() => {
      this.router.navigate(['/idle'])
    }, 20000)
  }

  sendOrderToBFF(): Observable<any> {
    const url = "http://localhost:8080/api/order";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const data = {
      items: this.basketService.getBasket().map(item => ({
        itemID: item.menuItem.id,
        shortName: item.menuItem.shortName,
        quantity: item.quantity
      }))
    }

    console.log(data);

    return this.http.post<any>(url, data, httpOptions);
  }

  async sendOrderToBackend(): Promise<OrderInformation> {
    try {

      const availableTables: Table[] = await this.availableTables();

      console.log("Available tables: ", availableTables);

      if (availableTables.length === 0) {
        throw new Error('No available table');
      }

      const table: Table = availableTables[0];

      const tableOrder: TableOrder = await this.openTable(table.number);

      const data = {
        items: this.basketService.getBasket().map(item => ({
          itemID: item.menuItem.id,
          shortName: item.menuItem.shortName,
          quantity: item.quantity
        }))
      }

      for (const kioskItem of data.items) {
        await this.addToTableOrder(tableOrder.id, new Item(kioskItem));
      }

      const preparationList: Preparation[] = await this.prepare(tableOrder.id);
      await this.bill(tableOrder.id);

      const shouldBeReadyAt: Date = this.getShouldBeReadyAt(preparationList);

      const tableOrderInformation: TableOrderInformation = new TableOrderInformation(tableOrder.id, shouldBeReadyAt);

      console.log("Order processed with table order id " + tableOrderInformation.tableOrderId);

      const orderId: number = this.orderIdService.getNextOrderId();

      this.orderIdService.linkOrderIdWithTableOrderId(orderId, tableOrderInformation.tableOrderId);

      const orderInformation: OrderInformation = new OrderInformation(tableOrderInformation.tableOrderId, orderId, tableOrderInformation.shouldBeReadyAt);

      this.orderIdService.incrementOrderId();

      return orderInformation

    } catch (error) {
      throw error;
    }
  }

  getShouldBeReadyAt(preparationList: Preparation[]): Date {
    console.log("Calculating the date when the order should be ready for:", preparationList);
    let shouldBeReadyAt: Date = new Date(Date.now());

    for (const preparation of preparationList) {
      if (shouldBeReadyAt < preparation.shouldBeReadyAt) {
        shouldBeReadyAt = preparation.shouldBeReadyAt
      }
    }

    console.log("Table order should be ready at: " + shouldBeReadyAt.toString());
    return shouldBeReadyAt;
  }

  async availableTables(): Promise<Table[]> {
    try {
      const allTables: Table[] = await this.getAllTable();
      const availableTables: Table[] = allTables.filter(table => !table.taken);
      return availableTables;
    } catch (error) {
      throw error;
    }
  }

  async getAllTable(): Promise<Table[]> {
    try {
      console.log("Ask Dining service for all tables");
      const response = await fetch(`${this.diningBaseUrlHostAndPort}/tables`);
      const tables: Table[] = await response.json();
      return tables;
    } catch (error) {
      throw error;
    }
  }

  async openTable(tableId: number): Promise<TableOrder> {
    try {
      console.log("Ask Dining service to open a table");
      const startOrdering: StartOrdering = new StartOrdering(tableId, 1);
      const response = await fetch(`${this.diningBaseUrlHostAndPort}/tableOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(startOrdering),
      });

      if (!response.ok) {
        throw new Error('Dining service is unavailable');
      }

      const tableOrder: TableOrder = await response.json();
      return tableOrder;
    } catch (error) {
      throw new Error('Dining service is unavailable');
    }
  }

  async addToTableOrder(tableOrderId: string, item: Item): Promise<TableOrder> {
    try {
      console.log("Ask Dining service to add an item to a table order: ", item);

      const response = await fetch(`${this.diningBaseUrlHostAndPort}/tableOrders/${tableOrderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Dining service is unavailable');
      }

      const tableOrder: TableOrder = await response.json();
      return tableOrder;
    } catch (error) {
      throw new Error('Dining service is unavailable');
    }
  }

  async prepare(tableOrderId: string): Promise<Preparation[]> {
    try {
      console.log("Ask Dining service to prepare a table order");
      const response = await fetch(`${this.diningBaseUrlHostAndPort}/tableOrders/${tableOrderId}/prepare`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Dining service is unavailable');
      }

      const preparationArray: Preparation[] = await response.json();
      return preparationArray;
    } catch (error) {
      throw new Error('Dining service is unavailable');
    }
  }

  async  bill(tableOrderId: string): Promise<TableOrder> {
    try {
      console.log("Ask Dining service to bill a table order");
      const response = await fetch(`${this.diningBaseUrlHostAndPort}/tableOrders/${tableOrderId}/bill`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Dining service is unavailable');
      }

      const tableOrder: TableOrder = await response.json();
      return tableOrder;
    } catch (error) {
      throw new Error('Dining service is unavailable');
    }
  }

  quit(): void {
    this.router.navigate(['/idle'])
  }

}

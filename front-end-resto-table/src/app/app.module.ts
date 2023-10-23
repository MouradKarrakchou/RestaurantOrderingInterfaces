import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IdleComponent } from './components/idle/idle.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BasketComponent } from './components/basket/basket.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CatalogComponent } from './components/catalog/catalog.component';
import { TruncateTextDirective } from './directives/truncate-text.directive';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from "@angular/material/select";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogContentComponent } from "./components/dialog-content/dialog-content.component";
import { MatDialogModule } from "@angular/material/dialog";
import { OrderNumberComponent } from './components/order-number/order-number.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MiddleTableComponent } from './components/middle-table/middle-table.component';


const routes: Routes = [
  { path: '', redirectTo: '/idle', pathMatch: 'full' }, // default page
  { path: 'idle', component: IdleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'order-number', component: OrderNumberComponent },
  { path: 'middle-table', component: MiddleTableComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IdleComponent,
    HomeComponent,
    HeaderComponent,
    BasketComponent,
    HeaderComponent,
    CatalogComponent,
    TruncateTextDirective,
    BasketSummaryComponent,
    ConfirmationComponent,
    FooterComponent,
    DialogContentComponent,
    OrderNumberComponent,
    MiddleTableComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        HttpClientModule,
        MatSlideToggleModule
    ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

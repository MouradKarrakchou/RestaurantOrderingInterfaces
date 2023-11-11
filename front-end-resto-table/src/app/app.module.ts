import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IdleComponent } from './components/common/idle/idle.component';
import { HomeComponent } from './components/client/home/home.component';
import { HeaderComponent } from './components/client/header/header.component';
import { BasketComponent } from './components/client/basket/basket.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CatalogComponent } from './components/client/catalog/catalog.component';
import { TruncateTextDirective } from './directives/truncate-text.directive';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from "@angular/material/select";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import { BasketSummaryComponent } from './components/common/basket-summary/basket-summary.component';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmationComponent } from './components/client/confirmation/confirmation.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { DialogContentComponent } from "./components/client/dialog-content/dialog-content.component";
import { MatDialogModule } from "@angular/material/dialog";
import { OrderNumberComponent } from './components/client/order-number/order-number.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MiddleTableComponent } from './components/middle/middle-table/middle-table.component';
import { TableViewerComponent } from './components/common/table-viewer/table-viewer.component';
import { GlobalBasketSummaryComponent } from './components/middle/global-basket-summary/global-basket-summary.component';
import { SwitchToTabsComponent } from './components/common/switch-to-tabs/switch-to-tabs.component';
import { SleepModeComponent } from './components/middle/sleep-mode/sleep-mode.component';
import { ClientReceiptComponent } from './components/client/client-receipt/client-receipt.component';
import { EndComponent } from './components/common/end/end.component';
import { PreparationStatusComponent } from './components/middle/preparation-status/preparation-status.component';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { GameLeaderboardComponent } from './components/middle/game-leaderboard/game-leaderboard.component';
import { WaitingScreenComponent } from './components/middle/waiting-screen/waiting-screen.component';
import { GameComponent } from './components/client/game/game.component';


const routes: Routes = [
  { path: '', redirectTo: '/table-viewer', pathMatch: 'full' }, // default page
  { path: 'idle/:id', component: IdleComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'order-number/:id', component: OrderNumberComponent },
  { path: 'middle-table', component: MiddleTableComponent },
  { path: 'table-viewer', component: TableViewerComponent },
  { path: 'sleep-mode', component: SleepModeComponent },
  { path: 'client-receipt/:id', component: ClientReceiptComponent },
  { path: 'end/:id', component: EndComponent },
  { path: 'waiting-screen', component: WaitingScreenComponent},
  { path: 'summary/:id', component: GlobalBasketSummaryComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '**', redirectTo: '/table-viewer' } // GARDER TOUT EN BAS
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
    TableViewerComponent,
    PreparationStatusComponent,
    SwitchToTabsComponent,
    GlobalBasketSummaryComponent,
    ClientReceiptComponent,
    MiddleTableComponent,
    SleepModeComponent,
    EndComponent,
    GameLeaderboardComponent,
    WaitingScreenComponent,
    GameComponent,
    SleepModeComponent,
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
        MatSlideToggleModule,
        MatSnackBarModule,
    ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

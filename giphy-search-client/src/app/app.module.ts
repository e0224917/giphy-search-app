import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule, MatTabsModule} from "@angular/material";
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainComponent} from './components/main.component';
import {FavouritesComponent} from './components/favourites.component';
import {SearchComponent} from './components/search.component';
import {GiphyService} from "./giphy.service";

const ROUTES: Routes = [
  {path: "", component: MainComponent},
  // { path: "customers", component: CustomerListComponent },
  // { path: "details/:custId", component: DetailsComponent },
  {path: "**", redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    FavouritesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatSliderModule,
    MatTabsModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

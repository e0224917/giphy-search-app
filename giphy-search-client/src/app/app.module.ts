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
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent, UsernameDialog} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FavoritesComponent} from './components/favorites.component';
import {SearchComponent} from './components/search.component';
import {GiphyService} from "./giphy.service";

const ROUTES: Routes = [
  {path: "", redirectTo: 'search', pathMatch: 'full'},
  {path: "search", component: SearchComponent},
  {path: "favorites", component: FavoritesComponent},
  {path: "**", redirectTo: 'search', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    SearchComponent,
    UsernameDialog,
  ],
  entryComponents: [
    UsernameDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
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
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {GiphyService} from "./giphy.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = 'Giphy Search App';
  navLinks: any[];
  username: string;

  constructor(private router: Router,
              public giphyService: GiphyService, public dialog: MatDialog) {
    this.navLinks = [
      {label: 'Search', path: 'search'},
      {label: 'Favourites', path: 'favorites'}
    ]
  }

  setUsername(): void {
    let dialogRef = this.dialog.open(UsernameDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.giphyService.username = result;
    });
  }
}

@Component({
  selector: 'username-dialog',
  templateUrl: './username.dialog.html',
})
export class UsernameDialog {

  constructor(public dialogRef: MatDialogRef<UsernameDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

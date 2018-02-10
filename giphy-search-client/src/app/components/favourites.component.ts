import {Component, OnInit} from '@angular/core';
import {GiphyService} from "../giphy.service";
import {ActivatedRoute} from "@angular/router";
import {GiphyImage} from "../model";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favoriteIds: string[] = [];
  favorites: GiphyImage[] = [];

  constructor(private giphyService: GiphyService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.giphyService.getFavorites('test')
      .then(result => {
        this.favoriteIds = result;
        console.log(">>> ids: ", result);
        this.giphyService.get(result).then(
          (response) => {
            this.favorites = response.data.reverse();
          }
        )
      })
  }

}

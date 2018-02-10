import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DownSized, GiphyImage, GiphyRequest} from "../model";
import {GiphyService} from "../giphy.service";
import {Subscription} from "rxjs/Subscription";
import {MatPaginator, MatSnackBar, PageEvent} from "@angular/material";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('searchForm')
  searchForm: NgForm;
  images: GiphyImage[] = [];

  currentRequest: GiphyRequest;

  @ViewChild('paginator')
  paginator: MatPaginator;
  // MatPaginator Inputs
  length: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  page: Subscription;

  constructor(private giphyService: GiphyService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.page = this.paginator.page.subscribe((pageEvent) => {
      if (this.images.length <= 0) {
        this.pageSize = pageEvent.pageSize;
      } else {
        this.currentRequest.offset = pageEvent.pageIndex * pageEvent.pageSize;
        this.currentRequest.limit = pageEvent.pageSize;
        this.search();
      }
    })
  }

  ngOnDestroy() {
    this.page.unsubscribe();
  }

  submit(): void {
    this.currentRequest = <GiphyRequest>{
      query: this.searchForm.value.query,
      limit: this.pageSize,
      offset: 0
    };
    this.search();
    this.searchForm.reset();
  }

  search(): void {
    this.giphyService.search(this.currentRequest)
      .then((response) => {
          this.images = response.data;
          this.length = response.pagination.total_count;
        },
        (error) => {
          console.log('>>>> error: ', error);
        }
      );
  }

  favorite(id: string) {
    this.giphyService.addToFavorites('test', id)
      .then(response => {
          this.snackBar.open('Added to favorites', 'Ok', {
            duration: 1000
          });
        },
        error => {
          this.snackBar.open(error.toString(), 'Ok', {
            duration: 1000
          });
        }
      );
  }
}

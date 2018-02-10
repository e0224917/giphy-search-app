import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GiphyRequest, GiphyResponse} from "./model";

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GiphyService {

  private API_KEY = 'Vd4ZgHKz6P05lLBaEJnkyhEoycsT0ejO';
  private SEARCH_ROOT = 'https://api.giphy.com/v1/gifs/search';
  private GET_ROOT = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
  }

  search(request: GiphyRequest): Promise<GiphyResponse> {
    const params = new HttpParams().set('api_key', this.API_KEY)
      .set('q', request.query).set('limit', request.limit.toString()).set('offset', request.offset.toString());
    return this.http.get<GiphyResponse>(this.SEARCH_ROOT, {params: params})
      .toPromise<GiphyResponse>();
  }

  get(ids: string[]): Promise<GiphyResponse> {
    const params = new HttpParams().set('api_key', this.API_KEY)
      .set('ids', ids.join(","));
    return this.http.get<GiphyResponse>(this.GET_ROOT, {params: params})
      .toPromise<GiphyResponse>();
  }

  addToFavorites(username: string, giphyId: string): Promise<any> {
    return this.http.post(`/giphy-search-server/favorites/${username}`, {giphyId: giphyId})
      .take(1)
      .toPromise();
  }

  getFavorites(username: string): Promise<any> {
    return this.http.get(`/giphy-search-server/favorites/${username}`)
      .take(1)
      .toPromise();
  }
}

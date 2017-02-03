import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: Http) {
  }

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(
      res =>
        res.json()
      );
  }

  getNew = () => {
    return this.http.get(this.url + '/media?limit=10')
      .map(
      res =>
        res.json()
      );
  }

}

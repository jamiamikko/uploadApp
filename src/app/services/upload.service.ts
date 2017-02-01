import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class UploadService {

  private formData: FormData;
  private file: File;
  private title: any;
  private description: any;

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: string = '';

  constructor(private http: Http, private router: Router) { }

  setFormData = (value, event) => {
    this.formData = new FormData();

    this.file = event.srcElement[0].files[0];
    this.title = value.title;
    this.description = value.description;

    
    this.formData.append('file', this.file);
    this.formData.append('title', this.title);

    if(this.description) {
      this.formData.append('description', this.description);
    }

  }

  upload = () => {
    this.token = JSON.parse(localStorage.getItem("user")).token;

    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });


    return this.http.post(this.url+'/media', this.formData, options)
      .subscribe(
        resp => {
          const dataFromServer = resp.json();
          
          console.log(dataFromServer);
        },
        error => {
          console.log(error);
        }
      );
  }

}

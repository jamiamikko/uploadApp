import { UploadService } from './../services/upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {


  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  upload = (value, event: any) => {
    this.uploadService.setFormData(value, event);
    this.uploadService.upload();
  };

}

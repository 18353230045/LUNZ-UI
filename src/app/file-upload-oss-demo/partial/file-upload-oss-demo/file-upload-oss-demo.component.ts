import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload-oss-demo',
  templateUrl: './file-upload-oss-demo.component.html',
  styleUrls: ['./file-upload-oss-demo.component.scss']
})

export class FileUploadOssDemoComponent implements OnInit {
  region: string;
  accessKeyId: string;
  accesskey: string;
  bucket: string;
  fileType: String = 'jpg';
  fileSize: Number = 20;
  fileNumber: Number = 10;

  constructor() { }

  ngOnInit() {
    this.region = 'oss-cn-qingdao';
    this.accessKeyId = '6MKOqxGiGU4AUk44';
    this.accesskey = 'ufu7nS8kS59awNihtjSonMETLI0KLy';
    this.bucket = 'lunz-test';
  }

}

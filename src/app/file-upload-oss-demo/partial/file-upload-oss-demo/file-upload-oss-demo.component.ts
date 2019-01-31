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
  fileType: string[] = ['jpg', 'png'];
  fileSize: number = 20;
  fileNumber: number = 5;

  constructor() { }

  ngOnInit() {
    this.region = '';
    this.accessKeyId = '';
    this.accesskey = '';
    this.bucket = '';
  }

}

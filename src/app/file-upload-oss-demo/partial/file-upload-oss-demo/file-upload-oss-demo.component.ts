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
    this.accessKeyId = 'LTAI0YCwE8sZc8Fz';
    this.accesskey = '7wBXU19Fy4D1Z2iun8BnAZDPtPxJim';
    this.bucket = 'lunz-test';
  }

}

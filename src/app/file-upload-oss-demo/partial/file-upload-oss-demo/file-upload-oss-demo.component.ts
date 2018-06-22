import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload-oss-demo',
  templateUrl: './file-upload-oss-demo.component.html',
  styleUrls: ['./file-upload-oss-demo.component.scss']
})
export class FileUploadOssDemoComponent implements OnInit {
  accessid: string;
  accesskey: string;
  host: string;

  constructor() { }

  ngOnInit() {
    this.accessid = '6MKOqxGiGU4AUk44';
    this.accesskey = 'ufu7nS8kS59awNihtjSonMETLI0KLy';
    this.host = 'http://post-test.oss-cn-hangzhou.aliyuncs.com';
  }

}

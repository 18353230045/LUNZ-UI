import { Component, OnInit, Input } from '@angular/core';

declare const Base64: any;
declare const Crypto: any;
declare const ossUpload: any;

@Component({
  selector: 'app-file-upload-oss',
  templateUrl: './file-upload-oss.component.html',
  styleUrls: ['./file-upload-oss.component.scss']
})

export class FileUploadOssComponent implements OnInit {
  @Input() showType: Boolean = true;

  // 配置上传参数
  @Input() accessid: string;
  @Input() accesskey: string;
  @Input() host: string;
  @Input() fileLenth?: Number = 1048576000;
  @Input() expiration?: String = '9020-01-01T12:00:00.000Z';

  // 设置上传的文件夹地址
  @Input()
  set g_dirname(val: string) {
    if (val !== '' && val.indexOf('/') !== val.length - 1) {
      val = val + '/';
    }
    this._g_dirname = val;
  };
  get g_dirname(): string {
    return this._g_dirname;
  };

  _g_dirname: string;
  testasdk: any;

  constructor() { }

  ngOnInit() {
    ossUpload.g_dirname = '3213';
    this.testasdk = ossUpload;
  }

}

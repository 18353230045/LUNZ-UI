import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const OSS: any;

@Component({
  selector: 'app-file-upload-oss',
  templateUrl: './file-upload-oss.component.html',
  styleUrls: ['./file-upload-oss.component.scss']
})

export class FileUploadOssComponent implements OnInit {

  // configuration parameter
  @Input() type?: String = 'rectangle';
  @Input() region: string;
  @Input() accessKeyId: string;
  @Input() accesskey: string;

  @Input()
  set bucket(val: string) {
    if (val !== '' && val.indexOf('/') !== val.length - 1) {
      val = val + '/';
    }
    this._bucket = val;
  };
  get bucket(): string {
    return this._bucket;
  };

  @Output() uploadStatus = new EventEmitter();

  _bucket: string;
  filesList: any[] = [];

  // Handle files
  handleFiles(files: any[]) {
    return new Promise((resolve) => {
      for (const file of files) {
        file['loading'] = false;
        file['remove'] = false;
        file['percent'] = 0;
      };
      resolve(files);
    });
  };

  // click select files
  clickSelectFiles($event: any) {
    this.filesList.length = 0;

    this.handleFiles($event.target.files).then((files: any[]) => {
      this.filesList.push(...files);
    });
  };

  // dragover preventDefault
  dragover($event: any) {
    $event.preventDefault();
  };

  // drop select files
  dropSelectFiles($event: any) {
    $event.preventDefault();

    this.handleFiles($event.dataTransfer.files).then((files: any[]) => {
      this.filesList.push(...files);
    });
  };

  // remove files
  removeFile(index: number) {
    this.filesList[index]['removeAnimation'] = 'fadeOutRight';
    setTimeout(() => {
      this.filesList.splice(index, 1);
    }, 300);
  };

  // upload files
  uploadFile() {
    const files = this.filesList;
    const key = 'object';

    const client = new OSS.Wrapper({
      region: this.region,
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accesskey,
      bucket: this.bucket
    });
    alert(typeof client);
    client.multipartUpload(key, files, {
      progress: this.progress
    }).then(function (res: any) {
      alert(`${res}`);
      console.log('upload success');
      this.uploadStatus.emit(res);
    });
  };

  // upload progress
  progress(p: any) {
    console.log(`进度${p}`);
  };

  constructor() { }

  ngOnInit() {
  }

}

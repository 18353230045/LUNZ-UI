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
  @Input() bucket: string;

  @Output() uploadStatus = new EventEmitter();

  client: any;
  filesList: any[] = [];

  constructor() {
  };

  ngOnInit() {
    this.client = new OSS.Wrapper({
      region: this.region,
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accesskey,
      bucket: this.bucket
    });
  };

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
    for (const file of this.filesList) {
      const index = file.name.lastIndexOf('.');
      const key = `${file.name.substring(0, index)}`;
      const progress = function (pro: any) {
        file['percent'] = pro * 100;
      };

      this.client.multipartUpload(key, file, {
        progress: progress
      }).then(((res: any) => {
        console.log('upload success');
        // this.uploadStatus.emit(res);
      }));
    };
  };

}

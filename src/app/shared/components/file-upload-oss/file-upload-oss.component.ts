import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const OSS: any;

@Component({
  selector: 'app-file-upload-oss',
  templateUrl: './file-upload-oss.component.html',
  styleUrls: ['./file-upload-oss.component.scss']
})

export class FileUploadOssComponent implements OnInit {

  // configuration parameter
  @Input() region: string;
  @Input() accessKeyId: string;
  @Input() accesskey: string;
  @Input() bucket: string;
  @Input() type?: String = 'rectangle';
  @Input() uploadButton?: Boolean;
  @Input() accept?: String = '*';
  @Input() fileSize?: String;

  @Output() uploadStatus = new EventEmitter();

  client: any;
  filesList: any[] = [];
  randomId: any;
  isDisabledUploadButton: Boolean = true;
  constructor() {
    this.randomId = Math.random();
  };

  ngOnInit() {
    this.client = new OSS.Wrapper({
      region: this.region,
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accesskey,
      bucket: this.bucket
    });
    console.log(this.fileSize);
  };

  // isDisabledUploadButton
  isDisabled() {
    if (this.filesList.length === 0) {
      this.isDisabledUploadButton = true;
    } else {
      for (const file of this.filesList) {
        if (!file.isLoad) {
          this.isDisabledUploadButton = false;
          return;
        };
      };
      this.isDisabledUploadButton = true;
    }
  };

  // file filter
  fileFilter(files: any[]) {
    return new Promise((resolve) => {
      const filesFiler: any[] = [];
      if (this.accept === '*') {
        resolve(files);
      } else {
        for (const file of files) {
          const fileName = file.name;
          const pattern = new RegExp(`${this.accept}`);
          if (pattern.test(fileName)) {
            filesFiler.push(file);
          };
        };
        resolve(filesFiler);
      }
    });
  };

  // Handle files
  handleFiles(files: any[]) {
    return new Promise((resolve) => {
      for (const file of files) {
        file['loading'] = false;
        file['remove'] = false;
        file['percent'] = 0;
        file['isLoad'] = false;
      };
      resolve(files);
    });
  };

  // click select files
  clickSelectFiles($event: any) {
    this.fileFilter($event.target.files).then((files: any[]) => {
      this.handleFiles(files).then((file: any[]) => {
        this.filesList.push(...file);
      }).then(() => {
        this.isDisabled();
      }).then(() => {
        if (!this.uploadButton) {
          this.uploadFile();
        };
      });
    });

  };

  // drop select files
  dropSelectFiles($event: any) {
    $event.preventDefault();
    this.fileFilter($event.dataTransfer.files).then((files: any[]) => {
      this.handleFiles(files).then((file: any[]) => {
        this.filesList.push(...file);
      }).then(() => {
        this.isDisabled();
      }).then(() => {
        if (!this.uploadButton) {
          this.uploadFile();
        };
      });
    });
  };

  // dragover preventDefault
  dragover($event: any) {
    $event.preventDefault();
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
      if (file.isLoad) {
        continue;
      };
      const index = file.name.lastIndexOf('.');
      const key = `${file.name.substring(0, index)}`;
      const progress = function (pro: any) {
        return function (done: any) {
          file['percent'] = pro * 100;
          done();
        };
      };
      this.client.multipartUpload(key, file, {
        progress: progress
      }).then(((res: any) => {
        file['href'] = res.res.requestUrls[0];
        file['isLoad'] = true;
        this.uploadStatus.emit(res);
      })).then(() => {
        this.isDisabled();
      });
    };
  };
}

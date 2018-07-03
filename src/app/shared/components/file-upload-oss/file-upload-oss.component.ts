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
  @Input() fileSize?: Number;
  @Input() fileNumber?: Number = 10;

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

  // filter file type
  filterFileType(files: any[]) {
    return new Promise((resolve) => {
      const filesFilter: any[] = [];
      if (this.accept === '*') {
        resolve(files);
      } else {
        for (const file of files) {
          const fileName = file.name;
          const pattern = new RegExp(`${this.accept}`);
          if (pattern.test(fileName)) {
            filesFilter.push(file);
          };
        };
        resolve(filesFilter);
      }
    });
  };

  // filter file size
  filterFileSize(files: any[]) {
    const filesFilter: any[] = [];
    return new Promise((resolve) => {
      if (!this.fileSize) {
        resolve(files);
      } else {
        for (const file of files) {
          const fileSize = file.size / 1024;
          if (fileSize <= this.fileSize) {
            filesFilter.push(file);
          };
        };
        resolve(filesFilter);
      };
    });
  };

  // filter file number
  filterFileNumber(files: any[]) {
    return new Promise((resolve) => {
      if (files.length > this.fileNumber) {
        return;
      } else {
        resolve(files);
      };
    });
  };

  // Handle files
  handleFiles(files: any[]) {
    return new Promise((resolve) => {
      this.filterFileType(files).then((file: any[]) => {
        this.filterFileNumber(file).then((fil: any[]) => {
          this.filterFileSize(fil).then((filesArr: any[]) => {
            for (const filesA of filesArr) {
              filesA['loading'] = false;
              filesA['remove'] = false;
              filesA['percent'] = 0;
              filesA['isLoad'] = false;
            };
            resolve(filesArr);
          });
        });
      });
    });
  };

  // click select files
  clickSelectFiles($event: any) {
    this.handleFiles($event.target.files).then((file: any[]) => {
      this.filesList.push(...file);
    }).then(() => {
      this.isDisabled();
    }).then(() => {
      if (!this.uploadButton) {
        this.uploadFile();
      };
    });
  };

  // drop select files
  dropSelectFiles($event: any) {
    $event.preventDefault();
    this.handleFiles($event.dataTransfer.files).then((file: any[]) => {
      this.filesList.push(...file);
    }).then(() => {
      this.isDisabled();
    }).then(() => {
      if (!this.uploadButton) {
        this.uploadFile();
      };
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

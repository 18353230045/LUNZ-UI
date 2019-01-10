import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

declare const OSS: any;

@Component({
  selector: 'app-file-upload-oss',
  templateUrl: './file-upload-oss.component.html',
  styleUrls: ['./file-upload-oss.component.scss']
})
export class FileUploadOssComponent implements OnInit {
  @Input() fileSize?: number;
  @Input() fileNumber?: number = 10;
  @Input() region: string;
  @Input() accessKeyId: string;
  @Input() accesskey: string;
  @Input() bucket: string;
  @Input() accept?: string = '*';
  @Input() type?: string = 'rectangle';
  @Input() uploadButtonBg?: string = 'btn-success';
  @Input() uploadButton?: boolean = false;

  @Output() uploadStatus = new EventEmitter();

  @ViewChild(`input1`) input1: ElementRef;
  @ViewChild(`input2`) input2: ElementRef;

  client: any;
  filesList: any[] = [];
  randomId: number;
  isDisabledUploadButton: boolean = true;
  isFirefox: boolean = false;

  constructor() {
    this.randomId = Math.random();
    this.isFirefox = /Firefox/.test(navigator.userAgent);
  }

  ngOnInit() {
    this.client = new OSS.Wrapper({
      region: this.region,
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accesskey,
      bucket: this.bucket
    });
  }

  // IsDisabledUploadButton
  isDisabled() {
    if (this.filesList.length === 0) {
      this.isDisabledUploadButton = true;
    } else {
      for (const file of this.filesList) {
        if (!file.isLoad) {
          this.isDisabledUploadButton = false;
          return;
        }
      }
      this.isDisabledUploadButton = true;
    }
  }

  // Filter file type
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
          }
        }
        resolve(filesFilter);
      }
    });
  }

  // Filter file size
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
          }
        }
        resolve(filesFilter);
      }
    });
  }

  // Filter file number
  filterFileNumber(files: any[]) {
    return new Promise((resolve) => {
      if (files.length > this.fileNumber) {
        return;
      } else {
        resolve(files);
      }
    });
  }

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
              filesA['status'] = 'ready';
            }
            resolve(filesArr);
          });
        });
      });
    });
  }

  // Select files
  selectFiles($event: any) {
    $event.preventDefault();
    this.handleFiles($event.target.files || $event.dataTransfer.files).then((file: any[]) => {
      this.filesList.push(...file);
    }).then(() => {
      this.isDisabled();
    }).then(() => {
      if (!this.uploadButton) {
        this.uploadFile();
      }
    });

    setTimeout(() => {
      this.input1.nativeElement.value = null;
      this.input2.nativeElement.value = null;
    }, 300);
  }

  // Dragover preventDefault
  dragover($event: any) {
    $event.preventDefault();
  }

  // Remove files
  removeFile(index: number) {
    this.filesList[index]['removeAnimation'] = 'fadeOutRight';
    setTimeout(() => {
      this.filesList.splice(index, 1);
      this.isDisabled();
    }, 300);
  }

  // Upload files
  uploadFile() {
    for (const file of this.filesList) {
      if (file.isLoad) continue;

      const index = file.name.lastIndexOf('.');
      const key = `${file.name.substring(0, index)}|${new Date().valueOf()}|${Math.random()}`;
      file['status'] = 'loading';

      const progress = function (pro: any) {
        return function (done: any) {
          file['percent'] = Number((pro * 100).toFixed(2));
          done();
        };
      };
      file['isLoad'] = true;
      this.isDisabled();
      this.client.multipartUpload(key, file, {
        progress: progress
      }).then(((res: any) => {
        const href = res.res.requestUrls[0];
        if (/\?uploadId/.test(href)) {
          file['href'] = href.substring(0, href.indexOf('?'));
        } else {
          file['href'] = href;
        }
        file['status'] = 'success';
        this.uploadStatus.emit(res);
      })).catch((reason: any) => {
        file['status'] = 'error';
        this.uploadStatus.emit(reason);
      });
    }
    this.input1.nativeElement.value = null;
    this.input2.nativeElement.value = null;
  }
}

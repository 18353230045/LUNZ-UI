import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, TemplateRef, AfterViewInit, AfterContentInit,
  ContentChildren, QueryList, ViewChild, ElementRef, NgZone
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { DomHandler } from 'primeng/components/dom/domhandler';
import { Message } from 'primeng/components/common/message';
import { PrimeTemplate } from 'primeng/shared';
import { BlockableUI } from 'primeng/components/common/blockableui';

@Component({
  selector: 'p-fileUpload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.scss'],
  providers: [DomHandler]
})
export class FileUpload implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, BlockableUI {
  @Input() files: File[];
  @Input() name: string;
  @Input() url: string;
  @Input() method: string = 'POST';
  @Input() multiple: boolean;
  @Input() accept: string;
  @Input() disabled: boolean;
  @Input() auto: boolean;
  @Input() withCredentials: boolean;
  @Input() maxFileSize: number;
  @Input() invalidFileSizeMessageSummary: string = '{0}: Invalid file size, ';
  @Input() invalidFileSizeMessageDetail: string = 'maximum upload size is {0}.';
  @Input() invalidFileTypeMessageSummary: string = '{0}: Invalid file type, ';
  @Input() invalidFileTypeMessageDetail: string = 'allowed file types: {0}.';
  @Input() style: any;
  @Input() styleClass: string;
  @Input() previewWidth: number = 50;
  @Input() chooseLabel: string = 'Choose';
  @Input() uploadLabel: string = 'Upload';
  @Input() cancelLabel: string = 'Cancel';
  @Input() showUploadButton: boolean = true;
  @Input() showCancelButton: boolean = true;
  @Input() mode: string = 'advanced';
  @Input() customUpload: boolean;

  @Output() onBeforeUpload: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeSend: EventEmitter<any> = new EventEmitter();
  @Output() onUpload: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  @Output() uploadHandler: EventEmitter<any> = new EventEmitter();

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  @ViewChild('advancedfileinput') advancedFileInput: ElementRef;
  @ViewChild('basicfileinput') basicFileInput: ElementRef;
  @ViewChild('content') content: ElementRef;

  public progress: number = 0;
  public dragHighlight: boolean;
  public msgs: Message[];
  public fileTemplate: TemplateRef<any>;
  public contentTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public focus: boolean;
  public duplicateIEEvent: boolean;  // flag to recognize duplicate onchange event for file input

  constructor(
    private el: ElementRef,
    public domHandler: DomHandler,
    public sanitizer: DomSanitizer,
    public zone: NgZone) { }

  ngOnInit() { this.files = []; }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'file':
          this.fileTemplate = item.template;
          break;
        case 'content':
          this.contentTemplate = item.template;
          break;
        case 'toolbar':
          this.toolbarTemplate = item.template;
          break;
        default:
          this.fileTemplate = item.template;
          break;
      }
    });
  }

  ngAfterViewInit() {
    if (this.mode === 'advanced') {
      this.zone.runOutsideAngular(() => {
        this.content.nativeElement.addEventListener('dragover', this.onDragOver.bind(this));
      });
    }
  }

  onFileSelect(event: any) {
    if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
      this.duplicateIEEvent = false;
      return;
    }

    this.msgs = [];
    // if (!this.multiple) this.files = [];

    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      file['progress'] = 0;
      file['status'] = 'ready';

      if (!this.isFileSelected(file)) {
        if (this.validate(file)) {
          if (this.isImage(file)) {
            file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
          }

          this.files.push(files[i]);
        }
      }
    }

    this.onSelect.emit({ originalEvent: event, files: this.files });

    if (this.hasFiles() && this.auto) this.upload();

    if (event.type !== 'drop' && this.isIE11()) {
      this.clearIEInput();
    } else {
      this.clearInputElement();
    }
  }

  isFileSelected(file: File): boolean {
    for (const sFile of this.files) {
      if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
        return true;
      }
    }

    return false;
  }

  isIE11() {
    return !!window['MSInputMethodContext'] && !!document['documentMode'];
  }

  validate(file: File): boolean {
    if (this.accept && !this.isFileTypeValid(file)) {
      this.msgs.push({
        severity: 'error',
        summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
        detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
      });
      return false;
    }

    if (this.maxFileSize && file.size > this.maxFileSize) {
      this.msgs.push({
        severity: 'error',
        summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
        detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
      });
      return false;
    }

    return true;
  }

  private isFileTypeValid(file: File): boolean {
    const acceptableTypes = this.accept.split(',');
    for (const type of acceptableTypes) {
      const acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
        : file.type === type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

      if (acceptable) return true;
    }

    return false;
  }

  getTypeClass(fileType: string): string {
    return fileType.substring(0, fileType.indexOf('/'));
  }

  isWildcard(fileType: string): boolean {
    return fileType.indexOf('*') !== -1;
  }

  getFileExtension(file: File): string {
    return '.' + file.name.split('.').pop();
  }

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  onImageLoad(img: any) {
    window.URL.revokeObjectURL(img.src);
  }

  upload() {
    if (this.customUpload) {
      this.uploadHandler.emit({ files: this.files });
    } else {
      this.msgs = [];

      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i]['status'] === 'ready') {
          const xhr = new XMLHttpRequest();
          const formData = new FormData();

          formData.append(this.name, this.files[i], this.files[i].name);

          this.onBeforeUpload.emit({ 'xhr': xhr, 'formData': formData });

          xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) { this.files[i]['progress'] = Math.round((e.loaded * 100) / e.total); }

            this.onProgress.emit({ originalEvent: e, progress: this.files });
          }, false);

          xhr.onreadystatechange = (event) => {
            if (xhr.readyState === 4) {

              if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.response);
                this.files[i]['url'] = response.Data.FullUrl;
                this.files[i]['status'] = 'successfully';

                this.onUpload.emit({ xhr: xhr, files: this.files });
              } else {
                this.files[i]['status'] = 'failed';
                this.onError.emit({ xhr: xhr, files: this.files });
              }
            }
          };

          xhr.open(this.method, this.url, true);

          this.onBeforeSend.emit({ 'xhr': xhr, 'formData': formData });

          xhr.withCredentials = this.withCredentials;

          xhr.send(formData);
        }
      }
    }
  }

  clear() {
    this.files = [];
    this.progress = 0;
    this.onClear.emit();
    this.clearInputElement();
  }

  remove(event: Event, index: number) {
    this.clearInputElement();
    this.onRemove.emit({ originalEvent: event, file: this.files[index] });
    this.files.splice(index, 1);
  }

  clearInputElement() {
    if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
      this.advancedFileInput.nativeElement.value = '';
    }

    if (this.basicFileInput && this.basicFileInput.nativeElement) {
      this.basicFileInput.nativeElement.value = '';
    }
  }

  clearIEInput() {
    if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
      this.duplicateIEEvent = true; // IE11 fix to prevent onFileChange trigger again
      this.advancedFileInput.nativeElement.value = '';
    }
  }

  hasFiles(): boolean {
    return this.files && this.files.length > 0;
  }

  onDragEnter(e: any) {
    if (!this.disabled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onDragOver(e: any) {
    if (!this.disabled) {
      this.domHandler.addClass(this.content.nativeElement, 'ui-fileupload-highlight');
      this.dragHighlight = true;
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onDragLeave(event: any) {
    if (!this.disabled) {
      this.domHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
    }
  }

  onDrop(event: any) {
    if (!this.disabled) {
      this.domHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
      event.stopPropagation();
      event.preventDefault();

      const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      const allowDrop = this.multiple || (files && files.length === 1);

      if (allowDrop) {
        this.onFileSelect(event);
      }
    }
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
  }

  formatSize(bytes: any) {
    if (bytes === 0) {
      return '0 B';
    }
    const k = 1000, dm = 3,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onSimpleUploaderClick(event: Event) {
    if (this.hasFiles()) {
      this.upload();
    }
  }

  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }

  ngOnDestroy() {
    if (this.content && this.content.nativeElement) {
      this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
    }
  }
}

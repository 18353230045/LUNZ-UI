import { Component, OnInit, Output, Input, EventEmitter, ElementRef, Renderer, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { FileManager, FileUploader, Utils, Transfer } from '../../../lib/ngx-file-uploader/public_api';

import { environment } from '../../../../environments/environment';
import { AuthenticationService, Credentials } from '../../../core/authentication/authentication.service';

declare var URI: any;

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
    log: Logger;
    uploadResult: Array<any> = [];
    deleteItem: any;
    fileLoaded: Boolean = false;

    @Input() uploader: FileUploader;
    @Input() ngValue: any;
    @Input() multiple?= true;
    @Input() accept = '*';

    @Output() success = new EventEmitter<any>();
    @Output() error = new EventEmitter<any>();
    @Output() ngValueChange = new EventEmitter<any>();


    _lastFile$: BehaviorSubject<FileManager> = new BehaviorSubject(null);
    private _files$: BehaviorSubject<FileManager[]> = new BehaviorSubject([]);

    constructor(
        private element: ElementRef,
        private renderer: Renderer,
        private injector: Injector,
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    }

    ngOnInit() {

        this.uploader = new FileUploader(this.getUploadOption());

        this.uploader.onSuccess = (_file: FileManager, _response: any, _status: number, _headers: any) => {
            _response = JSON.parse(_response);
            _response['fileType'] = this.fileType(_response);
            this.uploadResult.push(_response);

            const result: any = _response;
            if (result.Success) {
                this.onNgValueChange(result.Data);
                this.success.emit(result.Data);
                this.log.info(`${_file.name} 上传成功！`);
            } else {
                this.error.emit(Observable.throw(new Error(result.AllMessages)));
            }
        };

        this.uploader.onError = (_file: FileManager, _response: any, _status: number, _headers: any) => {
            _response = JSON.parse(_response);
            _response['fileType'] = this.fileType(_response);
            this.uploadResult.push(_response);

            if (_response === undefined || _status === undefined) {
                this.error.emit(Observable.throw(_response));
            } else {
                this.error.emit(Observable.throw(new Error(`[${_status}]${_response}`)));
            }

            this.log.info(`${_file.name} 上传失败！`);
        };

        this._files$.subscribe((data: FileManager[]) => {
            this.fileLoaded = (data.length > 0);
        }, (error: any) => {
            throw new Error(error);
        });

    };

    setFiles(event: any): void {
        this._files$.next(event);
        this.cleanUp();
    }

    private onNgValueChange(val: any) {
        this.ngValue = val;
        this.ngValueChange.emit(this.ngValue);
    };

    private cleanUp(): void {
        const files = this._files$.getValue();
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const file = files[key];
                if (!file.inQueue) {
                    files.splice(+key, 1);
                }
            }
        }
        if (files.length > 0) {
            this._lastFile$.next(files[files.length - 1]);
        }
        if (files.length === 0) {
            this._lastFile$.next(null);
        }
        this._files$.next(files);
    };

    private deleteUpload(row: any) {
        const index = this.uploadResult.indexOf(row);
        this.uploadResult.splice(index, 1);
    };

    private fileType(_file: any) {
        const file = _file.Data.FileType;
        if (file.indexOf('png') > 0 || file.indexOf('jpeg') > 0) {
            return 'fa-file-image-o';
        } else if (file.indexOf('docx') > 0) {
            return 'fa-file-word-o';
        } else if (file.indexOf('xlsx') > 0) {
            return 'fa-file-excel-o';
        } else if (file.indexOf('pdf') > 0) {
            return 'fa-file-pdf-o';
        } else if (file.indexOf('txt') > 0) {
            return 'fa-file-text-o';
        } else {
            return 'fa-file-o';
        }
    };

    private getUploadOption(): any {
        const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
        const credentials: Credentials = authenticationService.isAuthenticated() ?
            authenticationService.credentials : null;
        const token: string = credentials == null ? null : credentials.token;

        let url = environment.userCenter.serverUrl + 'ResourceItem/AddFile';
        let headers = {};

        if (environment.withHeaders) {
            headers = {
                'AppKey': environment.userCenter.appKey,
                'AuthToken': token
            };
        } else {
            const urlParser: any = URI(url);
            if (!urlParser.hasQuery('AppKey')) {
                urlParser.addSearch('AppKey', environment.userCenter.appKey);
            }
            if (!urlParser.hasQuery('AuthToken')) {
                urlParser.addSearch('AuthToken', token);
            }
            url = urlParser.toString();
        }

        return {
            method: 'POST',
            url: url,
            removeBySuccess: false,
            autoUpload: true,
            headers: headers,
            withCredentials: false,
            alias: 'file'
        };
    };
};

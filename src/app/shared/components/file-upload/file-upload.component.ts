import {
    Component, EventEmitter, ElementRef, Renderer,
    Output, Input, OnInit, Injector
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import {
    FileManager, FileManagerOptions, FileUploader,
    Utils, Transfer, TransferOptions
} from '../../../lib/@uniprank/ng2-file-uploader';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { environment } from '../../../../environments/environment';
import { AuthenticationService, Credentials } from '../../../core/authentication/authentication.service';

declare const URI: any;

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
    @Input() multiple?: Boolean = false;
    @Input() accept?: String = '*';
    @Input() ngValue: any;

    @Output() success = new EventEmitter<any>();
    @Output() error = new EventEmitter<any>();
    @Output() ngValueChange = new EventEmitter<any>();

    log: Logger;
    uploader: FileUploader;
    activeDeleteIcon: any;

    _files$: BehaviorSubject<FileManager[]> = new BehaviorSubject([]);
    _lastFile$: BehaviorSubject<FileManager> = new BehaviorSubject(null);

    constructor(
        private element: ElementRef,
        private renderer: Renderer,
        private injector: Injector,
        private loggerFactory: LoggerFactory, ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit(): void {
        this.uploader = new FileUploader(this.getUploadOption());

        this.uploader.onSuccess = (_file: FileManager, _response: any) => {
            _response = JSON.parse(_response);

            if (_response.Success) {
                const result: any = _response;
                _file['url'] = result.Data.Url;
                _file['isSuccess'] = '1';

                if (result.Success) {
                    this.onNgValueChange(result.Data);
                    this.success.emit(result.Data);
                } else {
                    this.error.emit(Observable.throw(new Error(result.AllMessages)));
                }
            } else {
                _file['isSuccess'] = '2';
                this.log.error(`文件大小不能超过5M！`);
            }
        };

        this.uploader.onError = (_file: FileManager, _response: any, _status: number, _headers: any) => {
            _file['isSuccess'] = '2';

            if (_response === undefined || _status === undefined) {
                this.error.emit(Observable.throw(_response));
            } else {
                this.error.emit(Observable.throw(new Error(`[${_status}]${_response}`)));
            }

            this.log.error(`${_file.name} 上传失败！`);
        };

        this.uploader.queue$.subscribe((data: FileManager[]) => {
            this.cleanUp();
        });
    };

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

    private setIcon(row: any) {
        if (row.indexOf('png') > 0 || row.indexOf('jpg') > 0) {
            return 'fa-file-image-o';
        } else if (row.indexOf('docx') > 0) {
            return 'fa-file-word-o';
        } else if (row.indexOf('xlsx') > 0) {
            return 'fa-file-excel-o';
        } else if (row.indexOf('pdf') > 0) {
            return 'fa-file-pdf-o';
        } else if (row.indexOf('txt') > 0) {
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

        let url = environment.api.userCenter.baseUrl + 'ResourceItem/AddFile';
        let headers = {};

        if (environment.api.v1.withHeaders) {
            headers = {
                'AppKey': environment.api.userCenter.appKey,
                'AuthToken': token
            };
        } else {
            const urlParser: any = URI(url);
            if (!urlParser.hasQuery('AppKey')) {
                urlParser.addSearch('AppKey', environment.api.userCenter.appKey);
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

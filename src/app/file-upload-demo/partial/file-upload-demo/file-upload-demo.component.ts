import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-file-upload-demo',
    templateUrl: './file-upload-demo.component.html',
    styleUrls: ['./file-upload-demo.component.scss']
})

export class FileUploadDemoComponent implements OnInit {
    log: Logger;
    url: string;
    headers: any;

    fileList: Array<any>;

    constructor(
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.url = `${environment.userCenter.serverUrl}ResourceItem/Add`;
        this.headers = {
            'AppKey': environment.userCenter.appKey
        };
    };

    // 过滤文件
    limit500(file: File): boolean {
        if (file.size > 500000) {
            this.log.info('文件超过了 500 kb.');
            return false;
        }

        return true;
    };

    // 上传成功事件
    successHandle(event: any) {
        console.log(event);
        this.log.info(`${event.commonFile.name} 上传成功!`);

        // do something
    };

    // 上传失败事件
    errorHandle(error: any) {
        this.log.error('上传失败');

        // do something
    };

    // 移除已上传文件事件
    removeHandle(event: any) {
        this.log.debug(event);

        // do something
    };

    // 上传进度事件
    progressHandle(event: any) {
        this.log.debug(event);

        // do something
    };

    // 点击已上传文件事件
    previewHandle(event: any) {
        this.log.debug(event);

        // do something
    };

};

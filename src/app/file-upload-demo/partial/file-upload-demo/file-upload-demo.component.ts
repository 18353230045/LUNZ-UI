import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

@Component({
    selector: 'app-file-upload-demo',
    templateUrl: './file-upload-demo.component.html',
    styleUrls: ['./file-upload-demo.component.scss']
})

export class FileUploadDemoComponent implements OnInit {
    log: Logger;

    constructor(
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {

    };

    // 上传成功事件
    successHandle(event: any) {
        this.log.debug(event);
        // do something
    };

    // 上传失败事件
    errorHandle(error: any) {
        this.log.debug(event);
        // do something
    };

};

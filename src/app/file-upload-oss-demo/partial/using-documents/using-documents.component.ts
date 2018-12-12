import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-using-documents',
    templateUrl: './using-documents.component.html',
    styleUrls: ['./using-documents.component.scss']
})
export class UsingDocumentsComponent implements OnInit {
    paramsList: Array<any> = [];

    constructor(
        public location: Location
    ) { }

    ngOnInit() {
        this.paramsList = [
            {
                name: 'region',
                explain: '必选，OSS账户region',
                type: 'String',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'accessKeyId',
                explain: '必选，OSS账户accessKeyId',
                type: 'String',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'accesskey',
                explain: '必选，OSS账户accesskey',
                type: 'String',
                optionaValue: '-',
                defaultValue: '-'
            },
            {
                name: 'bucket',
                explain: `可选，OSS账户bucket`,
                type: 'String',
                optionaValue: '可通过d，dd，D，DD，m，mm，M，MM，yy，yyyy任意组合',
                defaultValue: 'yyyy-mm-dd'
            },
            {
                name: 'type',
                explain: '可选，样式类型',
                type: 'String',
                optionaValue: 'rectangle,button',
                defaultValue: 'rectangle'
            },
            {
                name: 'uploadButton',
                explain: '可选，是否有上传按钮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'accept',
                explain: '可选， 文件类型',
                type: 'String',
                optionaValue: '文件扩展名',
                defaultValue: '*'
            },
            {
                name: 'fileSize',
                explain: '可选，文件大小',
                type: 'Number',
                optionaValue: '-',
                defaultValue: '-'
            },
            {
                name: 'fileNumber',
                explain: '可选，文件数量',
                type: 'Number',
                optionaValue: '任意正整数',
                defaultValue: '10'
            },
            {
                name: 'uploadButtonBg',
                explain: '可选，按钮颜色样式类',
                type: 'String',
                optionaValue: '-',
                defaultValue: 'btn-success'
            }
        ];
    };
};

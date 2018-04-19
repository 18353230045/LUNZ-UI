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
    ) { };

    ngOnInit() {
        this.paramsList = [
            {
                name: 'multiple',
                explain: '可选，设置单文件/多文件上传',
                type: 'boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'accept',
                explain: '可选，设置上传文件类型',
                type: 'string',
                optionaValue: `input标签accept属性对应的属性值，
                               如：application/msexcel、application/msword、
                               application/pdf、image/jpeg、image/png、video/x-msvideo等等`,
                defaultValue: '*（不限制）'
            },
            {
                name: 'success',
                explain: '可选，上传成功时的事件',
                type: '—',
                optionaValue: `—`,
                defaultValue: '-'
            },
            {
                name: 'error',
                explain: '可选，上传失败时的事件',
                type: '—',
                optionaValue: `—`,
                defaultValue: '-'
            },
            {
                name: 'ngValue',
                explain: '可选，上传成功时传出的数据',
                type: 'any',
                optionaValue: `—`,
                defaultValue: '-'
            }
        ];
    };

};

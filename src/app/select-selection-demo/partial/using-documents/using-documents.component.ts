import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-using-documents',
    templateUrl: './using-documents.component.html',
    styleUrls: ['./using-documents.component.scss']
})
export class UsingDocumentsComponent implements OnInit {
    paramsList: Array<any> = [];

    constructor() { }

    ngOnInit() {
        this.paramsList = [
            {
                name: 'selects',
                explain: '必选，数据源',
                type: 'Array<{text:String,value:String,disabled?:Boolean}>',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'model',
                explain: '组件交互的入口，可使用[(model)]=\'selectValue1\'实现双向数据绑定',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'disabled',
                explain: '可选，对组件进行禁用',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'clear',
                explain: '可选，配置可清除功能',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'item项禁用',
                explain: '当item项禁选时，数据对象添加‘disabled：true’字段即可',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            }
        ];
    };
};

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
                name: 'label',
                explain: '必选，label标签名',
                type: 'String',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'showType',
                explain: '可选，显示类型（inline,block）',
                type: 'String',
                optionaValue: 'inline,block',
                defaultValue: 'inline'
            },
            {
                name: 'model',
                explain: '组件交互的入口，可使用[(model)]=\'selectValue1\'实现双向数据绑定',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'clear',
                explain: '可选，配置可清除功能',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'clearEventer',
                explain: '可选，配置清除功能时可用，清楚value值时向外传递事件',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'disabled',
                explain: '当item项禁选时，数据对象添加‘disabled：true’字段即可',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            }
        ];
    };
};

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
            { name: 'selects', explain: '必选，数据源', type: 'Array<{text:string,value:string,disabled?:Boolean}>', optionaValue: '—', defaultValue: '-' },
            { name: 'label', explain: '必选，label标签名', type: 'String', optionaValue: '—', defaultValue: '-' },
            { name: 'showType', explain: '可选，显示类型（inline,block）', type: 'String', optionaValue: 'inline,block', defaultValue: 'inline' },
            { name: 'selected', explain: '选择时向外传递事件方法，同时向外传递选择值,block）', type: '—', optionaValue: '—', defaultValue: '-' },
            { name: 'defaultValue', explain: '可选，为组件内部传递默认值', type: 'string', optionaValue: '—', defaultValue: '-' },
            { name: 'clearEventer', explain: '可选，配置清除功能时可用，点击清除时向外传递事件', type: '—', optionaValue: '—', defaultValue: '-' },
            { name: 'disabled', explain: '当item项禁选时，数据对象添加‘disabled：true’字段即可', type: '—', optionaValue: '—', defaultValue: '-' }
        ];
    };
};

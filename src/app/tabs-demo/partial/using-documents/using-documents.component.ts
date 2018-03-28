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
                name: 'options',
                explain: '必选，数据源',
                type: 'Array<{text:String,id:String,disabled?:Boolean}>',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'type',
                explain: '可选，组件类型（btn,icon）',
                type: 'String',
                optionaValue: 'btn,icon',
                defaultValue: 'btn'
            },
            {
                name: 'position',
                explain: '可选，组件展开位置',
                type: 'String',
                optionaValue: 'center,right,left',
                defaultValue: 'center'
            },
            {
                name: 'dropText',
                explain: '可选，为btn型时可用，显示列表title，为icon型时不可用',
                type: 'String',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'class',
                explain: '可选，为dropdown触发按钮添加样式',
                type: 'String',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'iconClass',
                explain: '可选，为icon型可用，为dropdown触发按钮添加图标',
                type: 'String',
                optionaValue: '—',
                defaultValue: 'la la-ellipsis-h'
            },
            {
                name: 'itemIcon',
                explain: '可选，为item添加图标',
                type: 'String',
                optionaValue: '—',
                defaultValue: 'flaticon-share'
            },
            {
                name: 'separateCharacter',
                explain: '可选，为btn型并且配置多选时可用，选择值之间的隔字符',
                type: 'String',
                optionaValue: '任意',
                defaultValue: '/'
            },
            {
                name: 'trigger',
                explain: '可选，选择触发dropdown方式',
                type: 'String',
                optionaValue: 'click,hover',
                defaultValue: 'click'
            },
            {
                name: 'multiselect',
                explain: '可选，btn型可用，选择是否支持多选',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'selected',
                explain: '选择item项时向外传递事件方法，同时向外传递选择的item值',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'remove',
                explain: '可选，为btn型时，移除value值时向外传递事件',
                type: '—',
                optionaValue: '—',
                defaultValue: '-'
            }
        ];
    };
};

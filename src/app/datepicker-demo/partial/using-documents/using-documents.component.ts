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
                name: 'id',
                explain: '必选，input框标签id，用于绑定时间选择事件',
                type: 'String',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'format',
                explain: '可选，日期格式化',
                type: 'String',
                optionaValue: '可通过d，dd，D，DD，m，mm，M，MM，yy，yyyy任意组合',
                defaultValue: 'yyyy年mm月dd日'
            },
            {
                name: 'todayHighlight',
                explain: '可选，今日高亮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'autoclose',
                explain: '可选，选择完后自动关闭',
                type: 'StBooleanring',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'calendarWeeks',
                explain: '可选， 显示左侧的星期数',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'clearBtn',
                explain: '可选，显示清除按钮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'todayBtn',
                explain: '可选，显示今日按钮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'startView',
                explain: '可选，打开时的视图',
                type: 'String',
                optionaValue: 'days,months,years',
                defaultValue: 'days'
            },
            {
                name: 'minViewMode',
                explain: '可选， 最小选择视图',
                type: 'String',
                optionaValue: 'days,months,years',
                defaultValue: 'days'
            },
            {
                name: 'maxViewMode',
                explain: '可选，最大选择视图',
                type: 'String',
                optionaValue: 'days,months,years',
                defaultValue: 'years'
            },
            {
                name: 'orientation',
                explain: '可选，日期选择框弹出位置',
                type: 'String',
                optionaValue: 'left,right,bottom,auto,top left,top right,auto top,auto bottom',
                defaultValue: 'bottom'
            }
        ];
    };
};

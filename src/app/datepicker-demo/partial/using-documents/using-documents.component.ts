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
                name: 'date',
                explain: '必选，组件交互入口，可使用[(date)]=\'date1\'实现双向数据绑定',
                type: 'any',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'original',
                explain: '可选，当配置传出原始时间格式的可用，用于组件交互入口，可使用[(original)]=\'date1\'实现双向数据绑定',
                type: 'any',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'dateType',
                explain: '可选，配置组件传出时间类型',
                type: 'String',
                optionaValue: 'displayDate,originalDate',
                defaultValue: 'displayDate'
            },
            {
                name: 'format',
                explain: `可选，日期格式化，当需要传出原始时间格式时，format需传入空字符串，如：[format]=""`,
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
                type: 'Boolean',
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
                name: 'multidate',
                explain: '可选，支持多选',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'multidateSeparator',
                explain: '可选， 当支持多选时，值于值之间的隔字符',
                type: 'String',
                optionaValue: '任意',
                defaultValue: ','
            },
            {
                name: 'orientation',
                explain: '可选，日期选择框弹出位置',
                type: 'String',
                optionaValue: 'left,right,bottom,auto,top left,top right,auto top,auto bottom',
                defaultValue: 'bottom'
            },
            {
                name: 'startDate',
                explain: '可选，设定开始日期',
                type: 'string',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'endDate',
                explain: '可选，设定结束日期',
                type: 'string',
                optionaValue: '—',
                defaultValue: '-'
            }
        ];
    };
};

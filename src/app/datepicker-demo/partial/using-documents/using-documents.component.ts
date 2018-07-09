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
                name: 'ngModel',
                explain: '必选，获取组件传出值，通过其实现双向数据绑定',
                type: 'any',
                optionaValue: '—',
                defaultValue: '-'
            },
            {
                name: 'dateType',
                explain: '可选，传出时间类型["originalDate"："原始时间类型"，"displayDate"："常见显示类型]"',
                type: 'String',
                optionaValue: 'originalDate,displayDate',
                defaultValue: 'displayDate'
            },
            {
                name: 'format',
                explain: '可选，日期格式化',
                type: 'String',
                optionaValue: 'y（年），m(月)，d（日），h（时），i（分），s（秒），自由组合',
                defaultValue: 'yyyy-mm-dd hh:ii:ss'
            },
            {
                name: 'showMeridian',
                explain: '可选，显示上午/下午',
                type: 'Boolean',
                optionaValue: 'true，false',
                defaultValue: 'true'
            },
            {
                name: 'autoclose',
                explain: '选择日期后自动关闭',
                type: 'Boolean',
                optionaValue: 'true，false',
                defaultValue: 'true'
            },
            {
                name: 'startView',
                explain: '开始视图',
                type: 'Number',
                optionaValue: '0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图',
                defaultValue: '2'
            },
            {
                name: 'weekStart',
                explain: '开始星期',
                type: 'Number',
                optionaValue: '0：星期一，1：星期二，2：星期三，3：星期四，4：星期五，5：星期六，6：星期天',
                defaultValue: '1'
            },
            {
                name: 'startDate',
                explain: '开始日期',
                type: 'Date',
                optionaValue: '无,[开始日期前面的不能选择]',
                defaultValue: '-'
            },
            {
                name: 'endDate',
                explain: '结束日期',
                type: 'Date',
                optionaValue: '无,[结束日期后面的不能选择]',
                defaultValue: '-'
            },
            {
                name: 'daysOfWeekDisabled',
                explain: '禁选星期',
                type: 'String | Array<any>',
                optionaValue: '无,[例如：0,6或者[0,6]，即：禁止选择星期六和星期天的所有日期]',
                defaultValue: '-'
            },
            {
                name: 'minView',
                explain: '最小选择视图',
                type: 'String | Number',
                optionaValue: '0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图',
                defaultValue: '0'
            },
            {
                name: 'maxView',
                explain: '最小选择视图',
                type: 'String | Number',
                optionaValue: '0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图',
                defaultValue: '4'
            },
            {
                name: 'todayBtn',
                explain: '显示今日按钮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'clearBtn',
                explain: '显示清楚按钮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'false'
            },
            {
                name: 'todayHighlight',
                explain: '今日高亮',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'keyboardNavigation',
                explain: '键盘选择',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'forceParse',
                explain: '强制解析',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'minuteStep',
                explain: '选择分时最小步长',
                type: 'Number',
                optionaValue: '-',
                defaultValue: '5'
            },
            {
                name: 'pickerPosition',
                explain: '选择框位置',
                type: 'String',
                optionaValue: '-',
                defaultValue: 'bottom-right'
            },
            {
                name: 'initialDate',
                explain: '打开时初始日期',
                type: 'Date',
                optionaValue: '-',
                defaultValue: '-'
            },
            {
                name: 'isIcon',
                explain: '设置图标触发',
                type: 'Boolean',
                optionaValue: 'true,false',
                defaultValue: 'true'
            },
            {
                name: 'iconClass',
                explain: '设置图标样式类',
                type: 'String',
                optionaValue: '-',
                defaultValue: 'la la-calendar'
            }

        ];
    };
};

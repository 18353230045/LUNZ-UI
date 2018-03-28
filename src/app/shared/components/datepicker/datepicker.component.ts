import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit, AfterViewInit {
    @Input() id: String; // input框id
    @Input() format?: String = 'yyyy年mm月dd日'; // input框id
    @Input() todayHighlight?: Boolean = true; // 今日高亮
    @Input() autoclose?: Boolean = true; // 选择完后自动关闭
    @Input() calendarWeeks?: Boolean = false; // 显示星期左侧的星期数
    @Input() clearBtn?: Boolean = false; // 显示清除按钮(default: false)
    @Input() todayBtn?: Boolean = false; // 显示今日按钮(default: false)
    @Input() startView?: String = 'days'; // 打开时的视图(default: days)
    @Input() minViewMode?: String = 'days'; // 最小选择视图(days,months,years)
    @Input() maxViewMode?: String = 'years'; // 最大选择视图(days,months,years)
    @Input() orientation?: String = 'bottom'; // 位置(default: auto)

    @Input() multidate?: Boolean = false; // 支持多选(default: false)
    @Input() multidateSeparator?: String = ','; // 当支持多选时，值于值之间的隔字符

    @Output() selected = new EventEmitter();

    constructor() { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.setDatePicker();
    };

    setDatePicker() {

        $(`#${this.id}`).datepicker({
            language: 'zh-CN',   // 语言
            format: this.format,   // 日期格式化
            todayHighlight: this.todayHighlight,   // 今日高亮
            autoclose: this.autoclose,   // 选择完后自动关闭
            calendarWeeks: this.calendarWeeks,   // 显示星期左侧的星期数
            clearBtn: this.clearBtn,   // 显示清除按钮(default: false)
            todayBtn: this.todayBtn,   // 显示今天按钮(default: false)
            startView: this.startView,   // 打开时的视图
            minViewMode: this.minViewMode,   // 最小选择视图(days,months,years)
            maxViewMode: this.maxViewMode,   // 最大选择视图(days,months,years)
            assumeNearbyYear: true,   // 自动解析输入框中的值
            orientation: this.orientation,   // 位置(default: auto)
            multidate: this.multidate,   // 支持多选(default: false)
            multidateSeparator: this.multidateSeparator,   // 当支持多选时，值于值之间的隔字符
        }).on('changeDate', (ev: any) => {
            this.outgoingValue(ev.target.value);
        });

    };

    outgoingValue(event: any): void {
        this.selected.emit(event);
    };

};

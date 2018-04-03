import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit, AfterViewInit {
    @Input() id: String; // input id
    @Input() date: String = '';
    @Input() original?: String;
    @Input() dateType: String = 'displayDate';
    @Input() format?: String = 'yyyy年mm月dd日'; // format
    @Input() todayHighlight?: Boolean = true; // today highlight
    @Input() autoclose?: Boolean = true; // auto close
    @Input() calendarWeeks?: Boolean = false; // show left week
    @Input() clearBtn?: Boolean = false; // show clear btn(default: false)
    @Input() todayBtn?: Boolean = false; // show today btn(default: false)
    @Input() dateIcon?: Boolean = true; // input frame icon
    @Input() startView?: String = 'days'; // open the start view(default: days)
    @Input() minViewMode?: String = 'days'; // min select view(days,months,years)
    @Input() maxViewMode?: String = 'years'; // max select view(days,months,years)
    @Input() orientation?: String = 'bottom'; // position(default: auto)

    @Input() multidate?: Boolean = false; // multidate(default: false)
    @Input() multidateSeparator?: String = ','; // multidate multidateSeparator

    @Output() dateChange = new EventEmitter();
    @Output() originalChange = new EventEmitter();

    constructor() { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.setDatePicker();

        $(`.${this.id}`).click(function () {
            $(this).prev().trigger('focus');
        });
    };

    setDatePicker() {

        $(`#${this.id}`).datepicker({
            language: 'zh-CN',   // language
            format: this.format,   // format
            todayHighlight: this.todayHighlight,   // today highlight
            autoclose: this.autoclose,   // auto close
            calendarWeeks: this.calendarWeeks,   // show left week
            clearBtn: this.clearBtn,   // show clear btn(default: false)
            todayBtn: this.todayBtn,   // show today btn(default: false)
            startView: this.startView,   // open the start view(default: days)
            minViewMode: this.minViewMode,   // min select view(days,months,years)
            maxViewMode: this.maxViewMode,   // max select view(days,months,years)
            assumeNearbyYear: true,   // auto assumeNearbyYear
            orientation: this.orientation,   // position(default: auto)
            multidate: this.multidate,   // multidate(default: false)
            multidateSeparator: this.multidateSeparator,   // multidate multidateSeparator
        }).on('changeDate', (ev: any) => {

            if (this.dateType === 'displayDate') {
                this.dateChange.emit(ev.target.value);
            } else if (this.dateType === 'originalDate') {
                this.originalChange.emit(ev.date);
            }

        });
    };
};

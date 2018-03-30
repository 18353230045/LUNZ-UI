import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit, AfterViewInit {
    @Input() id: string; // input id
    @Input() date: string = ''; 
    @Input() format?: string = 'yyyy年mm月dd日'; // format
    @Input() todayHighlight?: boolean = true; // today highlight
    @Input() autoclose?: boolean = true; // auto close
    @Input() calendarWeeks?: boolean = false; // show left week
    @Input() clearBtn?: boolean = false; // show clear btn(default: false)
    @Input() todayBtn?: boolean = false; // show today btn(default: false)
    @Input() startView?: string = 'days'; // open the start view(default: days)
    @Input() minViewMode?: string = 'days'; // min select view(days,months,years)
    @Input() maxViewMode?: string = 'years'; // max select view(days,months,years)
    @Input() orientation?: string = 'bottom'; // position(default: auto)

    @Input() multidate?: boolean = false; // multidate(default: false)
    @Input() multidateSeparator?: string = ','; // multidate multidateSeparator

    @Output() dateChange = new EventEmitter();

    constructor() { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.setDatePicker();
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
            startView: this.startView,   //open the start view(default: days)
            minViewMode: this.minViewMode,   // min select view(days,months,years)
            maxViewMode: this.maxViewMode,   // max select view(days,months,years)
            assumeNearbyYear: true,   // auto assumeNearbyYear
            orientation: this.orientation,   // position(default: auto)
            multidate: this.multidate,   // multidate(default: false)
            multidateSeparator: this.multidateSeparator,   // multidate multidateSeparator
        }).on('changeDate', (ev: any) => {
            this.dateChange.emit(ev.target.value);
        });
    };

};

import { Directive, OnInit, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare const $: any;

@Directive({
    selector: '[appDatepicker]'
})

export class DatepickerDirective implements OnInit, AfterViewInit {
    @Input() ngModel?: any;
    @Input() original?: any;
    @Input() dateType?: String = 'displayDate';
    @Input() format?: String = 'yyyy-mm-dd'; // format
    @Input() todayHighlight?: Boolean = true; // today highlight
    @Input() autoclose?: Boolean = true; // auto close
    @Input() calendarWeeks?: Boolean = false; // show left week
    @Input() clearBtn?: Boolean = false; // show clear btn(default: false)
    @Input() todayBtn?: Boolean = false; // show today btn(default: false)
    @Input() startView?: String = 'days'; // open the start view(default: days)
    @Input() minViewMode?: String = 'days'; // min select view(days,months,years)
    @Input() maxViewMode?: String = 'years'; // max select view(days,months,years)
    @Input() multidate?: Boolean = false; // multidate(default: false)
    @Input() multidateSeparator?: String = ','; // multidate multidateSeparator
    @Input() orientation?: String = 'bottom'; // position(default: auto)
    @Input() forceParse?: Boolean = true; // whether the input is parsed
    @Input() startDate?: string; // set startDate
    @Input() endDate?: string; // set startDate

    @Output() ngModelChange = new EventEmitter();

    constructor(private el: ElementRef) { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.setDatePicker();
        this.setIconTrigger();
    };

    setDatePicker() {

        $(`#${this.el.nativeElement.id}`).datepicker({
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
            forceParse: this.forceParse,   // whether the input is parsed
            orientation: this.orientation,   // position(default: auto)
            multidate: this.multidate,   // multidate(default: false)
            multidateSeparator: this.multidateSeparator,   // multidate multidateSeparator
            startDate: this.startDate ? new Date(this.startDate) : null,  // set startDate
            endDate: this.startDate ? new Date(this.endDate) : null,   // set endDate
        }).on('changeDate', (ev: any) => {

            if (this.dateType === 'displayDate') {
                this.ngModelChange.emit(ev.target.value);
            } else if (this.dateType === 'originalDate') {
                this.ngModelChange.emit(ev.date);
            }

        });
    };

    // set icon trigger
    setIconTrigger() {
        const icon = $(`#${this.el.nativeElement.id}`).next('span');
        if (icon) {
            icon.css('cursor', 'pointer');
            icon.click(function () {
                $(this).prev('input').trigger('focus');
            });
        }
    };
};

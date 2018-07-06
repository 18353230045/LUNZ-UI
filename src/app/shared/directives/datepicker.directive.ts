import {
    Directive, OnInit,
    ElementRef, AfterViewInit,
    Input, Output, EventEmitter
} from '@angular/core';

declare const $: any;

@Directive({
    selector: '[appDatepicker]'
})

export class DatepickerDirective implements OnInit, AfterViewInit {
    @Input() ngModel?: any;
    @Input() dateType?: String = 'displayDate';        // 传出时间类型['originalDate'：原始时间类型，'displayDate'：常见显示类型]
    @Input() format?: String = 'yyyy-mm-dd hh:ii:ss';  // 日期格式化[String类型]
    @Input() showMeridian?: Boolean = true;            // 显示上午/下午[Boolean类型]
    @Input() autoclose?: Boolean = true;               // 选择日期后自动关闭[Boolean类型]
    @Input() startView?: Number = 2;                   // 开始视图[Number类型],0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图
    @Input() weekStart?: Number = 1;                   // 开始星期[Number类型],0：星期一，1：星期二，2：星期三，3：星期四，4：星期五，5：星期六，6：星期天
    @Input() startDate?: Date;                         // 开始日期[Date类型]，开始日期前面的不能选择
    @Input() endDate?: Date;                           // 结束日期[Date类型]，结束日期后面的不能选择
    @Input() daysOfWeekDisabled?: String | Array<any>; // 禁选星期[String类型 | Array类型]，例如：'0,6'或者[0,6]，即：禁止选择星期六和星期天的所有日期
    @Input() minView?: String | Number = 0;            // 最小选择视图[String类型 | Number类型]，0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图
    @Input() maxView?: String | Number = 4;            // 最大选择视图[String类型 | Number类型]，0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图
    @Input() todayBtn?: Boolean = false;               // 显示今日按钮[Boolean类型]
    @Input() clearBtn?: Boolean = false;               // 显示清楚按钮[Boolean类型]
    @Input() todayHighlight?: Boolean = true;          // 今日高亮[Boolean类型]
    @Input() keyboardNavigation?: Boolean = true;      // 键盘选择[Boolean类型]
    @Input() forceParse?: Boolean = true;              // 强制解析[Boolean类型]
    @Input() minuteStep?: Number = 5;                  // 选择分时最小步长[Number类型]
    @Input() pickerPosition?: String = 'bottom-right'; // 选择框位置[String类型]
    @Input() initialDate?: Date;                       // 打开时初始日期[Date类型]
    @Input() isIcon?: Boolean = true;                  // 设置图标触发[Boolean类型]
    @Input() iconClass?: String = 'la la-calendar';    // 设置图标[String类型]

    @Output() ngModelChange = new EventEmitter();

    constructor(private el: ElementRef) { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.setDatePicker().then(() => {
            this.setIconTrigger().then(() => {
                this.setBlur().then(() => {
                    this.repairIcon();
                });
            });
        });
    };

    setDatePicker() {
        return new Promise((resolve) => {
            $(`#${this.el.nativeElement.id}`).datetimepicker({
                language: 'zh-CN',
                format: this.format,
                showMeridian: this.showMeridian,
                autoclose: this.autoclose,
                startView: this.startView,
                weekStart: this.weekStart,
                startDate: this.startDate,
                endDate: this.endDate,
                daysOfWeekDisabled: this.daysOfWeekDisabled,
                minView: this.minView,
                maxView: this.maxView,
                todayBtn: this.todayBtn,
                clearBtn: this.clearBtn,
                todayHighlight: this.todayHighlight,
                keyboardNavigation: this.keyboardNavigation,
                forceParse: this.forceParse,
                minuteStep: this.minuteStep,
                pickerPosition: this.pickerPosition,
                initialDate: this.initialDate
            }).on('changeDate', (ev: any) => {
                if (this.dateType === 'displayDate') {
                    this.ngModelChange.emit(ev.target.value);
                } else if (this.dateType === 'originalDate') {
                    this.ngModelChange.emit(ev.date);
                }
            });
            resolve();
        });
    };

    // set blur
    setBlur() {
        return new Promise((resolve) => {
            $(`#${this.el.nativeElement.id}`).blur((ev: any) => {
                if (this.ngModel) {
                    this.ngModelChange.emit(this.ngModel);
                    $(`#${this.el.nativeElement.id}`).val(this.ngModel);
                    return;
                };

                if (this.dateType === 'displayDate') {
                    this.ngModelChange.emit(ev.target.value);
                } else if (this.dateType === 'originalDate') {
                    this.ngModelChange.emit(ev.date);
                }
            });
            resolve();
        });
    };

    // set icon trigger
    setIconTrigger() {
        return new Promise((resolve) => {
            if (this.isIcon) {
                $(`#${this.el.nativeElement.id}`).after(`<span class="input-group-addon" 
                        style="cursor: pointer;"><i class="${this.iconClass}"></i></span>`);

                $(`#${this.el.nativeElement.id}`).next('span').click(function () {
                    $(this).prev('input').trigger('focus');
                });
                resolve();
            };
        });
    };

    // Fix the last page / next page icon
    repairIcon() {
        $('.glyphicon-arrow-left').addClass('fa fa fa-angle-double-left');
        $('.glyphicon-arrow-right').addClass('fa fa fa-angle-double-right');
    };
};

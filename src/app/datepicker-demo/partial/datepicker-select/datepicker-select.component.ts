import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-datepicker-select',
    templateUrl: './datepicker-select.component.html',
    styleUrls: ['./datepicker-select.component.scss']
})

export class DatepickerSelectComponent implements OnInit {
    date1: String;
    date2: String;
    date3: String;
    date4: String;
    date5: String;
    date6: String;
    date7: String;
    date8: String;
    date9: String;

    constructor() { };

    ngOnInit() { };

    getDate1(event: any) {
        this.date1 = event;
    };

    getDate2(event: any) {
        this.date2 = event;
    };

    getDate3(event: any) {
        this.date3 = event;
    };

    getDate4(event: any) {
        this.date4 = event;
    };

    getDate5(event: any) {
        this.date5 = event;
    };

    getDate6(event: any) {
        this.date6 = event;
    };

    getDate7(event: any) {
        this.date7 = event;
    };

    getDate8(event: any) {
        this.date8 = event;
    };

    getDate9(event: any) {
        this.date9 = event;
    };

};

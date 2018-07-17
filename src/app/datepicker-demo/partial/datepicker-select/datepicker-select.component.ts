import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-datepicker-select',
    templateUrl: './datepicker-select.component.html',
    styleUrls: ['./datepicker-select.component.scss']
})

export class DatepickerSelectComponent implements OnInit {
    date1: any;
    date2: any;
    date3: any = '2018-06-01 11:15:00';
    date4: any;
    date5: any;
    date6: any;
    date7: any;
    date8: any;
    date9: any;
    date10: any;
    date11: any;
    date12: any;
    date13: any;
    date14: any;
    date15: any;

    startDate: any = new Date(2018, 6, 1);
    endDate: any = new Date(2018, 6, 10);

    constructor() { };

    ngOnInit() { };
};

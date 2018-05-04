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
    date10: String;
    date11: String;
    date12: String;
    date13: String;
    date14: String;
    startDate: any = new Date(2018, 4, 9);
    endDate: any = new Date(2018, 4, 15);

    constructor( ) { };

    ngOnInit() { };
};

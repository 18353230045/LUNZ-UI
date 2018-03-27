import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-datepicker-select',
    templateUrl: './datepicker-select.component.html',
    styleUrls: ['./datepicker-select.component.scss']
})

export class DatepickerSelectComponent implements OnInit {
    value1: String;
    value2: String;
    value3: String;
    value4: String;
    value5: String;
    value6: String;
    value7: String;
    value8: String;
    value9: String;

    constructor() { };

    ngOnInit() { };

    getValue1(event: any) {
        this.value1 = event;
    };

    getValue2(event: any) {
        this.value2 = event;
    };

    getValue3(event: any) {
        this.value3 = event;
    };

    getValue4(event: any) {
        this.value4 = event;
    };

    getValue5(event: any) {
        this.value5 = event;
    };

    getValue6(event: any) {
        this.value6 = event;
    };

    getValue7(event: any) {
        this.value7 = event;
    };

    getValue8(event: any) {
        this.value8 = event;
    };

    getValue9(event: any) {
        this.value9 = event;
    };

};

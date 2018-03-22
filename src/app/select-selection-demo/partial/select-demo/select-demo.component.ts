import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-select-demo',
    templateUrl: './select-demo.component.html',
    styleUrls: ['./select-demo.component.scss']
})

export class SelectDemoComponent implements OnInit {
    selects1: Array<any> = [];
    selects2: Array<any> = [];
    selects3: Array<any> = [];
    selects4: Array<any> = [];

    defaultValue: any;

    selectValue1: any;
    selectValue2: any;
    selectValue3: any;
    selectValue4: any;

    constructor() { };

    ngOnInit() {
        this.selects1 = [
            { text: 'item01', value: '01' },
            { text: 'item02', value: '02' },
            { text: 'item03', value: '03' },
            { text: 'item04', value: '04' },
            { text: 'item05', value: '05' },
            { text: 'item06', value: '06' }
        ];

        this.selects2 = [
            { text: 'item01', value: '01' },
            { text: 'item02', value: '02', disabled: true },
            { text: 'item03', value: '03' },
            { text: 'item04', value: '04' },
            { text: 'item05', value: '05' },
            { text: 'item06', value: '06' }
        ];

        this.selects3 = [
            { text: 'item01', value: '01' },
            { text: 'item02', value: '02' },
            { text: 'item03', value: '03' },
            { text: 'item04', value: '04' },
            { text: 'item05', value: '05' },
            { text: 'item06', value: '06' }
        ];

        this.selects4 = [
            { text: 'item01', value: '01' },
            { text: 'item02', value: '02' },
            { text: 'item03', value: '03' },
            { text: 'item04', value: '04' },
            { text: 'item05', value: '05' },
            { text: 'item06', value: '06' }
        ];

        this.defaultValue = '05';
    };

    selected1(event: any) {
        this.selectValue1 = event;
    };

    selected2(event: any) {
        this.selectValue2 = event;
    };

    selected3(event: any) {
        this.selectValue3 = event;
    };

    selected4(event: any) {
        this.selectValue4 = event;
    };

    clear() {
        this.selectValue4 = null;
    };
}

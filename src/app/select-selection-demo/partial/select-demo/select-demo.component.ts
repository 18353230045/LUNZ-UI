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

    selectValue1: any;
    selectValue2: any;
    selectValue3: any = '03';
    selectValue4: any;

    constructor() { };

    ngOnInit() {
        this.selects1 = [
            { text: '一年级', value: '01' },
            { text: '二年级', value: '02' },
            { text: '三年级', value: '03' },
            { text: '四年级', value: '04' },
            { text: '五年级', value: '05' },
            { text: '六年级', value: '06' }
        ];

        this.selects2 = [
            { text: '一0二班', value: '01' },
            { text: '一0三班', value: '02', disabled: true },
            { text: '一0四班', value: '03' },
            { text: '一0五班', value: '04' },
            { text: '一0六班', value: '05' },
            { text: '一0七班', value: '06' }
        ];

        this.selects3 = [
            { text: 'A组', value: '01' },
            { text: 'B组', value: '02' },
            { text: 'C组', value: '03' },
            { text: 'D组', value: '04' },
            { text: 'E组', value: '05' },
            { text: 'F组', value: '06' }
        ];

        this.selects4 = [
            { text: '一楼', value: '01' },
            { text: '二楼', value: '02' },
            { text: '三楼', value: '03' },
            { text: '四楼', value: '04' },
            { text: '五楼', value: '05' },
            { text: '六楼', value: '06' }
        ];

    };

    clear() {
        this.selectValue4 = null;
    };
}

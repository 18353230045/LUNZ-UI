import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs-demo',
    templateUrl: './tabs-demo.component.html',
    styleUrls: ['./tabs-demo.component.scss']
})

export class TabsDemoComponent implements OnInit {
    tabsArray1: Array<any> = [];
    tabsArray2: Array<any> = [];
    panel: String = '1';

    // line-tabs
    efferentValue1: any;
    efferentValue2: any;
    efferentValue3: any;
    efferentValue4: any;
    efferentValue5: any;

    // bootstrap-line-tabs
    efferentValue6: any;
    efferentValue7: any;

    // bootstrap-btn-tabs
    efferentValue8: any;
    efferentValue9: any;

    constructor() { };

    ngOnInit() {
        this.tabsArray1 = [
            { text: '北京', id: '1' },
            { text: '上海', id: '2' },
            { text: '广州', id: '3' },
            { text: '深圳', id: '4' }
        ];

        this.tabsArray2 = [
            { text: '北京', icon: 'la la-cloud-download', id: '1' },
            {
                text: '上海',
                id: '2',
                dropdown: true,
                dropdownArray: [
                    { text: '黄浦区', id: '01' },
                    { text: '普陀区', id: '02' },
                    { text: '虹口区', id: '03' },
                    { text: '浦东新区', id: '04' }
                ]
            },
            { text: '广州', id: '3', },
            { text: '深圳', id: '4', disabled: true }
        ];

    };

    // line-tabs
    getItem1(event: any) {
        this.panel = event.id;
        this.efferentValue1 = JSON.stringify(event);
    };

    getItem2(event: any) {
        this.efferentValue2 = JSON.stringify(event);
    };

    getItem3(event: any) {
        this.efferentValue3 = JSON.stringify(event);
    };

    getItem4(event: any) {
        this.efferentValue4 = JSON.stringify(event);
    };

    getItem5(event: any) {
        this.efferentValue5 = JSON.stringify(event);
    };

    // bootstrap-line-tabs
    getItem6(event: any) {
        this.efferentValue6 = JSON.stringify(event);
    };

    getItem7(event: any) {
        this.efferentValue7 = JSON.stringify(event);
    };

    // bootstrap-btn-tabs
    getItem8(event: any) {
        this.efferentValue8 = JSON.stringify(event);
    };

    getItem9(event: any) {
        this.efferentValue9 = JSON.stringify(event);
    };

};

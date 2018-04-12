import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
    options: Array<any> = [];
    item1: any;
    item2: any;
    item3: any;
    item4: any;

    constructor() { };

    ngOnInit() {
        this.options = [
            { text: 'item1', id: '01' },
            { text: 'item2', id: '02', disabled: true },
            { text: 'item3', id: '03' },
            { text: 'item4', id: '04' },
            { text: 'item5', id: '05' },
            { text: 'item6', id: '06' }
        ];
    };

    handle1(event: any) {
        this.item1 = JSON.stringify(event);
    };

    handle2(event: any) {
        this.item2 = JSON.stringify(event);
    };

    handle3(event: any) {
        this.item3 = JSON.stringify(event);
    };

    handle4(event: any) {
        this.item4 = JSON.stringify(event);
    };

    remove() {
        this.item2 = '';
    };
};

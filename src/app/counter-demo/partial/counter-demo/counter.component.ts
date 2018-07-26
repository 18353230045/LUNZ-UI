import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss']
})

export class CounterComponent implements OnInit {
    value01: any = 1231;
    value02: any;
    value03: any;
    value04: any;
    value05: any;
    value06: any;
    value07: any;
    value08: any;

    valueStep: number;
    minValue1: number;
    maxValue1: number;
    minValue2: number;
    maxValue2: number;

    identifierLeft: string = '￥';
    identifierRight: string = '$';

    constructor() {
    };

    ngOnInit() {
    };

};

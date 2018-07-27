import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rate-demo',
    templateUrl: './rate-demo.component.html',
    styleUrls: ['./rate-demo.component.scss']
})

export class RateDemoComponent implements OnInit {
    rate1: number = 2;
    rate2: number = 3;
    rate3: number = 1;
    rate4: number = 4;
    rate5: number = 2;
    rate6: number = 2;
    change: any;

    constructor(
    ) {
    };

    ngOnInit() {

    };

    rateChange(event: any) {
        this.change = event;
    };

};

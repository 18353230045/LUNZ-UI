import { Component, OnInit } from '@angular/core';

declare const Slider: any;
@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {

    constructor() {
    };

    ngOnInit() {
        const slider = new Slider('#slider1', {
            tooltip: 'always'
        });
    };

};

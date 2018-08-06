import { Component, OnInit } from '@angular/core';

declare const Slider: any;

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {
    slider1: any;
    value01: any;

    slider2: any;
    value02: any;

    slider3: any;
    value03: any;

    slider4: any;
    value04: any;

    slider5: any;
    value05: any;

    slider6: any;
    value06: any;

    slider7: any;
    value07: any;

    slider8: any;
    value08: any;

    constructor() {
    };

    ngOnInit() {
        // 单滑块
        this.slider01();
        // 双滑块
        this.slider02();
        // 单滑块[配置初始值]
        this.slider03();
        // 双滑块[配置初始值]
        this.slider04();
        // 双滑块[配置最小/大值]
        this.slider05();
        // 设置步长
        this.slider06();
        // 设置value值得进度[保留小数点后两位]
        this.slider07();
        // 禁用
        this.slider08();
    };

    // 单滑块
    slider01() {
        // 实例化一个slider
        this.slider1 = new Slider('#slider1', {
            tooltip: 'always'
        }).on('change', (value: any) => {
            this.value01 = value.newValue;
        });
        // 初始获取slider的值
        this.value01 = this.slider1.getValue();
    };

    // 双滑块
    slider02() {
        // 实例化一个slider
        this.slider2 = new Slider('#slider2', {
            tooltip: 'always',
            range: true
        }).on('change', (value: any) => {
            this.value02 = value.newValue;
        });
        // 初始获取slider的值
        this.value02 = this.slider2.getValue();
    };

    // 单滑块[配置初始值为5]
    slider03() {
        // 实例化一个slider
        this.slider3 = new Slider('#slider3', {
            tooltip: 'always',
            value: 5
        }).on('change', (value: any) => {
            this.value03 = value.newValue;
        });
        // 初始获取slider的值
        this.value03 = this.slider3.getValue();
    };

    // 单滑块[配置初始值为2,8]
    slider04() {
        // 实例化一个slider
        this.slider4 = new Slider('#slider4', {
            tooltip: 'always',
            value: [2, 8]
        }).on('change', (value: any) => {
            this.value04 = value.newValue;
        });
        // 初始获取slider的值
        this.value04 = this.slider4.getValue();
    };

    // 最小/大值
    slider05() {
        // 实例化一个slider
        this.slider5 = new Slider('#slider5', {
            tooltip: 'always',
            min: 10,
            max: 100
        }).on('change', (value: any) => {
            this.value05 = value.newValue;
        });
        // 初始获取slider的值
        this.value05 = this.slider5.getValue();
    };

    // 设置步长
    slider06() {
        // 实例化一个slider
        this.slider6 = new Slider('#slider6', {
            tooltip: 'always',
            min: 0,
            max: 100,
            step: 3
        }).on('change', (value: any) => {
            this.value06 = value.newValue;
        });
        // 初始获取slider的值
        this.value06 = this.slider6.getValue();
    };

    // 设置value值得精度
    slider07() {
        // 实例化一个slider
        this.slider7 = new Slider('#slider7', {
            tooltip: 'always',
            min: 0,
            max: 100,
            step: 0.01,
            value: 10.50,
            precision: 2
        }).on('change', (value: any) => {
            this.value07 = value.newValue;
        });
        // 初始获取slider的值
        this.value07 = this.slider7.getValue();
    };

    // 禁用
    slider08() {
        // 实例化一个slider
        this.slider8 = new Slider('#slider8', {
            tooltip: 'always',
            min: 0,
            max: 100,
            enabled: false
        }).on('change', (value: any) => {
            this.value08 = value.newValue;
        });
        // 初始获取slider的值
        this.value08 = this.slider8.getValue();
    };

};

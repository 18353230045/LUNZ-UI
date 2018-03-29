import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit, AfterViewInit {
    @Input() tabsData: Array<any> = [];  // 添加tabs的数据（必传）
    @Input() tabsType?: String = 'line-tabs'; // 设置tabs的类型[line-tabs，bootstrap-line-tabs,bootstrap-btn-tabs]默认line-tabs
    @Input() bootomBorder2X?: Boolean = false;  // line-tabs时可用，设置激活时下边框的宽度
    @Input() colorThemeStyle?: String = 'm-tabs-line--primary';  // line-tabs时可用，设置item的字体颜色
    @Input() btnColor?: String = 'nav-pills--success';  // 为bootstrap-btn-tabs时可用，设置btn的颜色
    @Input() iconColor?: String = 'm--font-brand';  // 为bootstrap-tabs时可用，设置icon的颜色
    @Input() choice?: Number = 0;  // 设置默认加载激活第几个tab

    @Output() selected = new EventEmitter();

    constructor() { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.defaultSelection(this.tabsData, this.choice);
    };

    selectedItem(event: any) {
        if (event.dropdown || event.disabled) {
            return;
        }

        this.selected.emit(event);
    };

    defaultSelection(arr: Array<any>, i: any) {
        arr.forEach((item, index) => {
            if (i === index) {
                this.selectedItem(item);
            }
        });
    };

};

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit {
    @Input() tabsData: Array<any> = [];  // data
    // tabs is type [line-tabs，bootstrap-line-tabs,bootstrap-btn-tabs]default line-tabs
    @Input() tabsType?: String = 'line-tabs';
    // when'line-tabs'is available, set the active border to the rough border.
    @Input() bootomBorder2X?: Boolean = false;
    // when'line-tabs'is available, set the font color of item
    @Input() colorThemeStyle?: String = 'm-tabs-line--primary';
    @Input() btnColor?: String = 'nav-pills--success';  // when'bootstrap-btn-tabs'is available, set the color of btn.
    @Input() iconColor?: String = 'm--font-brand';  // when'bootstrap-tabs'is available, set the color of Icon
    @Input() choice?: Number = 0;  // setting the default load to activate the number of tab

    @Output() selected = new EventEmitter();

    constructor() { };

    ngOnInit() {
        this.defaultSelection(this.tabsData, this.choice);
    };

    selectedItem(event: any) {
        if (event.dropdown || event.disabled) {
            return;
        }

        this.selected.emit(event);
    };

    defaultSelection(arr: Array<any>, choice: any) {
        arr.forEach((item, index) => {
            if (choice === index) {
                this.selectedItem(item);
            }
        });
    };

};

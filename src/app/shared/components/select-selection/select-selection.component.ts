import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-select-selection',
    templateUrl: './select-selection.component.html',
    styleUrls: ['./select-selection.component.scss']
})

export class SelectSelectionComponent implements OnInit {
    @Input() selects: Array<any> = [];
    @Input() defaultValue?: any;
    @Input() clear?: Boolean = false;
    @Input() label: String;
    @Input() showType?: String = 'inline';

    @Output() selected = new EventEmitter();
    @Output() clearEventer = new EventEmitter();

    constructor() { };

    ngOnInit() {
    };

    select(event: any) {
        this.selected.emit(event);
    };

    clearValue() {
        this.defaultValue = null;
        this.clearEventer.emit();
    };

};

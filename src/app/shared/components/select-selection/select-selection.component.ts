import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-select-selection',
    templateUrl: './select-selection.component.html',
    styleUrls: ['./select-selection.component.scss']
})

export class SelectSelectionComponent implements OnInit {
    @Input() selects: Array<any> = [];
    @Input() label: String;
    @Input() showType?: String = 'inline';
    @Input() model: any = '';
    @Input() clear?: Boolean = false;

    @Output() modelChange = new EventEmitter();

    constructor() { };

    ngOnInit() {
    };

    select(event: any) {
        this.model = event;
        this.modelChange.emit(event);
    };

    clearValue() {
        this.model = null;
        this.modelChange.emit(this.model);
    };

};

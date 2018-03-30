import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-select-selection',
    templateUrl: './select-selection.component.html',
    styleUrls: ['./select-selection.component.scss']
})

export class SelectSelectionComponent implements OnInit {
    @Input() selects: Array<any> = [];
    @Input() label: string;
    @Input() showType?: string = 'inline';
    @Input() model: any = '';
    @Input() clear?: boolean = false;

    @Output() modelChange = new EventEmitter();
    @Output() clearEventer = new EventEmitter();

    constructor() { };

    ngOnInit() {
    };

    select(event: any) {
        this.model = event;
        this.modelChange.emit(event);
    };

    clearValue() {
        this.model = null;
        this.clearEventer.emit();
    };

};

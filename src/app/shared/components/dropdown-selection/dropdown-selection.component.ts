import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-dropdown-selection',
    templateUrl: './dropdown-selection.component.html',
    styleUrls: ['./dropdown-selection.component.scss']
})

export class DropdownSelectionComponent implements OnInit {
    @Input() options: Array<any> = [];
    @Input() position?: string = 'center';
    @Input() type?: string = 'btn';
    @Input() dropText?: string;
    @Input() iconClass?: string = 'la la-ellipsis-h';
    @Input() itemIcon?: string = 'flaticon-share';
    @Input() class?: string;
    @Input() trigger?: string = 'click';
    @Input() separateCharacter?: string = '/';
    @Input() multiselect?: boolean = false;

    @Output() selected = new EventEmitter();
    @Output() remove = new EventEmitter();

    openDropdown: boolean = false;
    isEmpty: boolean = true;
    recordBtnText: string;

    constructor() { };

    ngOnInit() {
        this.recordBtnText = this.dropText;
    };

    onSelected(item: any) {
        if (item.disabled) {
            return;
        };

        if (this.multiselect && this.type === 'btn') {
            if (this.isEmpty) {
                this.dropText = `${item.text}`;
                this.isEmpty = false;
            } else {
                this.dropText += `${this.separateCharacter}${item.text}`;
            }
            this.selected.emit(item);
            return;
        } else if (this.type === 'btn') {
            this.dropText = `${item.text}`;
            this.isEmpty = false;
            this.selected.emit(item);
        } else {
            this.selected.emit(item);
        }

        this.openDropdown = false;
    };

    removeValue(): void {
        this.dropText = this.recordBtnText;
        this.isEmpty = true;
        this.remove.emit();
    };

};

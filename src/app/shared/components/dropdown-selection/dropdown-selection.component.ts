import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-dropdown-selection',
    templateUrl: './dropdown-selection.component.html',
    styleUrls: ['./dropdown-selection.component.scss']
})

export class DropdownSelectionComponent implements OnInit {
    @Input() options: Array<any> = [];
    @Input() position?: String = 'center';
    @Input() type?: String = 'btn';
    @Input() dropText?: String;
    @Input() icon?: String = 'la la-ellipsis-h';
    @Input() iconClass?: String;
    @Input() btnColor?: String = 'btn-secondary';
    @Input() trigger?: String = 'click';
    @Input() separateCharacter?: String = '/';
    @Input() multiselect?: Boolean = false;
    @Input() selectParent?: Boolean = false;

    @Output() selected = new EventEmitter();
    @Output() remove = new EventEmitter();

    openDropdown: Boolean = true;
    isEmpty: Boolean = true;
    recordBtnText: String;
    multiselectArray: Array<any> = [];
    radioSelect: any;

    constructor() { };

    ngOnInit() {
        this.recordBtnText = this.dropText;
    };

    openChildren(row: any) {
        if (row.children) {
            row.childrenOpen = true;
        }
    };

    closeChildren(row: any) {
        if (row.childrenOpen) {
            row.childrenOpen = false;
        }
    };

    toggleDropdown() {
        if (!this.openDropdown) {
            this.openDropdown = true;
        };
    };

    onSelected(event: any, item: any) {
        // 多选或者禁用时取消事件冒泡（即关闭弹窗事件）
        if (this.multiselect || item.disabled) {
            event.stopPropagation();
        };

        // 禁用时返回
        if (item.disabled) {
            return;
        };

        // 按钮型多选时
        if (this.multiselect && this.type === 'btn') {
            // 为空时
            if (this.isEmpty) {
                // 有子集时
                if (item.children) {
                    // 不能选中父级
                    if (!this.selectParent) {
                        return;
                    }
                }
                this.dropText = `${item.text}`;
                this.multiselectArray.push(item);
                this.selected.emit(this.multiselectArray);
                this.isEmpty = false;
            } else {
                // 不为空时，查看是否已经选择过，是则返回
                for(const m of this.multiselectArray){
                    if (item.text === m.text) {
                        event.stopPropagation();
                        return;
                    }
                };
                if (item.children) {
                    // 不能选中父级
                    if (!this.selectParent) {
                        return;
                    }
                }
                this.dropText += `${this.separateCharacter} ${item.text}`;
                this.multiselectArray.push(item);
                this.selected.emit(this.multiselectArray);
            }
        } else if (this.type === 'btn') { // 按钮型单选时
            this.multiselectArray = [];
            if (item.children) {
                if (!this.selectParent) {
                    event.stopPropagation();
                    return;
                }
            }
            this.multiselectArray.push(item);
            this.dropText = `${item.text}`;
            this.selected.emit(this.multiselectArray);
            this.openDropdown = true;
        } else {  // icon型时
            this.multiselectArray = [];
            if (item.children) {
                if (!this.selectParent) {
                    event.stopPropagation();
                    return;
                }
            }
            this.multiselectArray.push(item);
            this.selected.emit(this.multiselectArray);
            this.openDropdown = true;
        }
    };

    removeValue(): void {
        this.dropText = this.recordBtnText;
        this.isEmpty = true;
        this.multiselectArray = [];
        this.remove.emit();
    };
};

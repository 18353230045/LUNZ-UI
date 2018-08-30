import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { TreeviewDemoService } from '../../shared/treeview-demo.service';
import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

@Component({
    selector: 'app-create-node-modal',
    templateUrl: './create-node-modal.component.html',
    styleUrls: ['./create-node-modal.component.scss']
})
export class CreateNodeModalComponent implements OnInit {

    log: Logger;
    saving = false;
    node: any;
    form: FormGroup;
    @Input() data: any;
    @Output() action = new EventEmitter();

    constructor(
        private treeviewService: TreeviewDemoService,
        private loggerFactory: LoggerFactory,
        private formBuilder: FormBuilder,
        public activeModal: BsModalRef,
        private cdf: ChangeDetectorRef) {
        this.log = this.loggerFactory.getLogger();
        this.buildForm();
    };

    ngOnInit() {
        console.log(this.data);
    };

    submit() {

        // 此处调用接口，存节点数据
        this.saving = true;
        this.action.emit(null);
        this.activeModal.hide();

    }

    private buildForm() {
        this.form = this.formBuilder.group({
            nodeName: [null, [Validators.required, Validators.maxLength(10)]],
        });
    };

}

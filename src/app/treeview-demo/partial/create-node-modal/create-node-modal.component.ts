import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { TreeviewDemoService } from '../../shared/treeview-demo.service';
import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';


@Component({
    selector: 'app-create-node-modal',
    templateUrl: '../edit-node-modal/edit-node-modal.component.html',
    styleUrls: ['../edit-node-modal/edit-node-modal.component.scss']
})
export class CreateNodeModalComponent implements OnInit {

    log: Logger;
    saving = false;
    form: FormGroup;
    @Input() data: any = {};

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
    };

    submit() {

        this.saving = true;

    }

    private buildForm() {
        this.form = this.formBuilder.group({
            nodeName: [null, [Validators.required, Validators.maxLength(10)]],
        });
    }

}

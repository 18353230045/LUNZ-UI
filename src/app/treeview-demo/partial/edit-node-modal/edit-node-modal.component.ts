import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';
import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

@Component({
    selector: 'app-edit-node-modal',
    templateUrl: './edit-node-modal.component.html',
    styleUrls: ['./edit-node-modal.component.scss']
})
export class EditNodeModalComponent implements OnInit {
    log: Logger;
    saving = false;
    form: FormGroup;
    @Input() data: any = {};

    constructor(
        private treeviewService: TreeviewDemoService,
        private loggerFactory: LoggerFactory,
        private formBuilder: FormBuilder,
        public activeModal: BsModalRef) {
        this.log = this.loggerFactory.getLogger();
        this.buildForm();
    };

    ngOnInit() {
    };

    submit() {
        // 此处调用接口，存节点数据
        this.saving = true;
        // this.treeviewService
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            nodeName: [null, [Validators.required, Validators.maxLength(50)]]
        });
    }

}

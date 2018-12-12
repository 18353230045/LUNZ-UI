import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';

@Component({
  selector: 'app-edit-node-modal',
  templateUrl: './edit-node-modal.component.html',
  styleUrls: ['./edit-node-modal.component.scss']
})
export class EditNodeModalComponent implements OnInit {
  log: Logger;
  saving = false;
  middleVariable: any;
  form: FormGroup;
  @Input() data: any;
  @Output() action = new EventEmitter();

  constructor(
    private treeviewService: TreeviewDemoService,
    private loggerFactory: LoggerFactory,
    private formBuilder: FormBuilder,
    public activeModal: BsModalRef) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() { }

  submit() {
    // 此处调用接口，存节点数据
    this.saving = true;
    this.action.emit(this.middleVariable);
    this.activeModal.hide();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nodeName: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }

  // tslint:disable-next-line:member-ordering
  cloneData(row: any) {
    const cacheArr: Array<any> = [];
    this.middleVariable = JSON.parse(JSON.stringify(row, (key: any, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (cacheArr.indexOf(value) !== -1) {
          return;
        }
        cacheArr.push(value);
      }
      return value;
    }));
  }
}

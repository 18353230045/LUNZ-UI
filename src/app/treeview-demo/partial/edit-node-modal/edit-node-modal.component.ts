import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap';
import { TreeNode } from 'primeng/api';
import { cloneDeep } from 'lodash';

import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';

@Component({
  selector: 'app-edit-node-modal',
  templateUrl: './edit-node-modal.component.html',
  styleUrls: ['./edit-node-modal.component.scss']
})
export class EditNodeModalComponent implements OnInit {
  @Input() node: TreeNode;

  log: Logger;
  saving = false;
  form: FormGroup;
  varNode: TreeNode;

  constructor(
    private treeviewService: TreeviewDemoService,
    private loggerFactory: LoggerFactory,
    private formBuilder: FormBuilder,
    public modalService: BsModalService) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() {
    this.varNode = cloneDeep(this.node);
  }

  submit() {
    const params = { id: this.varNode['id'], parentId: this.varNode['parentId'], name: this.varNode['label'] };
    this.saving = true;

    this.treeviewService.editNode(params).subscribe(() => {
      this.saving = false;
      this.modalService.hide(1);
    }, error => {
      this.saving = false;
      this.log.error(`节点保存失败，失败信息：${error}`);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nodeName: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }

}

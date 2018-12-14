import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap';
import { cloneDeep } from 'lodash';
import { TreeNode } from 'primeng/api';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';

@Component({
  selector: 'app-create-node-modal',
  templateUrl: './create-node-modal.component.html',
  styleUrls: ['./create-node-modal.component.scss']
})
export class CreateNodeModalComponent implements OnInit {
  @Input() node: TreeNode;

  log: Logger;
  form: FormGroup;
  saving = false;

  constructor(
    private treeviewService: TreeviewDemoService,
    private loggerFactory: LoggerFactory,
    private formBuilder: FormBuilder,
    public modalService: BsModalService,
    private cdf: ChangeDetectorRef) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() { }

  submit() {
    const node = cloneDeep(this.node);

    let parentId;
    if (node['level'] === 'sameLevel') {
      if (!node.parent) {
        parentId = null;
      } else {
        parentId = node['parentId'];
      }
    } else if (node['level'] === 'subLevel') {
      parentId = node['id'];
    }

    this.saving = true;
    const params = { parentId: parentId, name: this.form.value.nodeName };

    this.treeviewService.createNode(params).subscribe((newNode: any) => {
      this.saving = false;
      this.modalService.onHidden.emit(null);
      this.modalService.hide(1);
    }, error => {
      this.saving = false;
      this.log.error(`节点创建失败，失败信息：${error}`);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nodeName: [null, [Validators.required, Validators.maxLength(10)]],
    });
  }

}

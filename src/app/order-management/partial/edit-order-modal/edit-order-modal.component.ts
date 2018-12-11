import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';
import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-edit-order-modal',
  templateUrl: './edit-order-modal.component.html',
  styleUrls: ['./edit-order-modal.component.scss']
})
export class EditOrderModalComponent implements OnInit {
  @Input() data: any;
  @Output() action = new EventEmitter();

  log: Logger;
  form: FormGroup;
  saving = false;
  middleVariable: any;

  hearFromItems: Array<any> = [
    { key: 1, text: '广告' },
    { key: 2, text: '传单' },
    { key: 3, text: '朋友' }
  ];

  constructor(
    private ordersService: OrdersService,
    private loggerFactory: LoggerFactory,
    private formBuilder: FormBuilder,
    public activeModal: BsModalRef) {
    this.log = this.loggerFactory.getLogger('订单编辑');
    this.buildForm();
  }

  ngOnInit() {
    this.middleVariable = JSON.parse(JSON.stringify(this.data));
  }

  submit() {
    this.saving = true;
    this.ordersService.updateOrder(this.data)
      .subscribe(() => {
        this.saving = false;
        this.action.emit(this.middleVariable);
        this.activeModal.hide();
        this.log.success(`订单编辑成功!`);
      }, error => {
        this.saving = false;
        this.log.error('订单保存失败。', error);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      subject: [null, [Validators.required, Validators.maxLength(50)]],
      date: [null, [Validators.required]],
      hearFrom: [null, [Validators.required]],
      price: [null, [Validators.required]],
      amount: [null, [Validators.required]]
    });
  }

}

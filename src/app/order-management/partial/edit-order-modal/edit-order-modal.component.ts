import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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
  saving = false;
  form: FormGroup;
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
    public activeModal: BsModalRef,
    private cdf: ChangeDetectorRef) {
    this.log = this.loggerFactory.getLogger('编辑订单');
    this.buildForm();
  }

  ngOnInit() {
    this.middleVariable = JSON.parse(JSON.stringify(this.data));
  }

  submit() {
    this.saving = true;
    this.ordersService.updateOrder(this.data)
      .subscribe(response => {
        this.saving = false;
        this.action.emit(this.middleVariable);
        this.activeModal.hide();
        this.log.info('成功修改订单!', response);
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

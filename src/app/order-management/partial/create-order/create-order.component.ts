import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { OrdersService } from '../../shared/orders.service';

declare const lengthStorageArea: any;

@Component({
  selector: 'app-create-order',
  templateUrl: '../edit-order/edit-order.component.html',
  styleUrls: ['../edit-order/edit-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  log: Logger;
  title = '新建订单';
  saving = false;
  form: FormGroup;
  order: any = {};
  hearFromItems: Array<any> = [
    { key: 1, text: '广告' },
    { key: 2, text: '传单' },
    { key: 3, text: '朋友' }
  ];

  constructor(
    private router: Router,
    public location: Location,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`创建订单`);
    this.buildForm();
  }

  ngOnInit() {
    this.order = { subject: '', date: null, hearFrom: 1, price: null, amount: null };
  }

  submit() {
    this.saving = true;

    this.ordersService.createOrder(this.order)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.router.navigate(['/orders']);
        this.log.success('订单创建成功!');
      }, error => this.log.error('订单创建失败。', error));
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      subject: [null, [Validators.required, Validators.maxLength(50)]],
      date: [null, [Validators.pattern(lengthStorageArea.dateValPattern), Validators.required]],
      hearFrom: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      amount: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }
}

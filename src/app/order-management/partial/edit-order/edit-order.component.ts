import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';

import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';
import { OrdersService } from '../../shared/orders.service';

declare const lengthStorageArea: any;

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  log: Logger;
  title = '编辑订单';
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
    private route: ActivatedRoute,
    public location: Location,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`订单编辑`);
    this.buildForm();
  }

  ngOnInit() {
    this.load();
  }

  submit() {
    this.saving = true;
    this.ordersService.updateOrder(this.order).subscribe(() => {
      this.saving = false;
      this.router.navigate(['/orders']);
      this.log.success(`订单 ${this.order.subject} 编辑成功!`);
    }, error => {
      this.saving = false;
      this.log.error(`订单 ${this.order.subject} 保存失败，失败信息:`, error);
    });
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

  private load() {
    this.route.params.pipe(map(params => params.id)).subscribe(id => {
      if (id) {
        this.ordersService.getOrder(id)
          .subscribe((order: any) => {
            this.order = order;
          }, error => this.log.error('订单数据获取失败, 失败信息：', error));
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { ReferenceDataService } from "../../../shared/services/reference-data.service";

import { OrdersService } from '../../shared/orders.service';

declare const lengthStorageArea: any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  log: Logger;
  title = '新建订单';
  saving = false;
  order: any = {
    subject: '',
    date: null,
    hearFromId: null,
    hearFromName: null,
    price: null,
    amount: null,
    items: []
  };
  hearFromItems: Array<any>;

  constructor(private ordersService: OrdersService,
    private referenceDataService: ReferenceDataService,
    private loggerFactory: LoggerFactory,
    private router: Router, public location: Location) {
    this.log = this.loggerFactory.getLogger();
  }

  ngOnInit() {
    this.getHearFroms();
  }

  submit() {

    if ((!this.ordersService.hasValue(this.order.subject)) ||
      (!this.ordersService.hasValue(this.order.date)) ||
      (!this.ordersService.hasValue(this.order.price)) ||
      (!this.ordersService.hasValue(this.order.amount))) {
      this.log.error('表单数据不完整，请检查。');
      return;
    }

    if ((this.order.price <= 0) || (this.order.amount <= 0)) {
      this.log.error('单价或数量的值应大于0，请检查。');
      return;
    }

    if (this.order.items.length > 0) {
      for (let i = 0; i < this.order.items.length; i++) {
        const item = this.order.items[i];
        if (this.ordersService.hasValue(item.productName) &&
          this.ordersService.hasValue(item.price) &&
          this.ordersService.hasValue(item.amount) &&
          item.price > 0 && item.amount > 0) {
          continue;
        } else {
          this.log.error('订单项目数据不完整，请检查。');
          return;
        }
      }
    }

    this.saving = true;

    this.ordersService.createOrder(this.order)
      .subscribe(response => {
        this.saving = false;
        this.router.navigate(['/orderlist']);
        this.log.info('订单创建成功!', response);
      }, error => {
        this.saving = false;
        this.log.error('订单创建失败。', error);
      });
  }

  addOrderItem() {
    this.order.items.push({
      productName: '',
      price: null,
      amount: null
    });
  }

  deleteOrderItem(i: number) {
    this.order.items.splice(i, 1);
  }

  selectHearFrom(id: string) {
    const item = this.hearFromItems.filter(h => {
      return h.id === id;
    });
    this.order.hearFromName = item[0].name;
  }

  private getHearFroms() {
    this.referenceDataService.getHearFroms()
      .subscribe(response => {
        this.hearFromItems = response;
        this.hearFromItems.unshift({ id: null, name: '---请选择---' });
        this.log.debug('HearFroms 集合', this.hearFromItems);
      });
  }
}

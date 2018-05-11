import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DateFormatPipe } from 'angular2-moment';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { OrdersService } from '../../shared/orders.service';
import { HearFromsService } from '../../../hear-from/shared/hear-froms.service';

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
  hearFromItems: Array<any>;

  constructor(private ordersService: OrdersService,
    private hearFromsService: HearFromsService,
    private loggerFactory: LoggerFactory, private router: Router,
    private route: ActivatedRoute, public location: Location,
    private formBuilder: FormBuilder, private dateFormat: DateFormatPipe) {
    this.log = this.loggerFactory.getLogger();
    this.buildForm();
  }

  ngOnInit() {
    this.getHearFroms();
    this.load();
  }

  submit() {

    if (!this.form.valid) {
      this.log.error('表单数据不完整，请检查。');
      return;
    }

    this.saving = true;

    this.ordersService.updateOrder(this.order)
      .subscribe(response => {
        this.saving = false;
        this.router.navigate(['/orderlist']);
        this.log.info('成功修改订单!', response);
      }, error => {
        this.saving = false;
        this.log.error('订单保存失败。', error);
      });
  }

  selectHearFrom(id: string) {
    const item = this.hearFromItems.filter(h => {
      return h.id == id
    });
    this.order.hearFromName = item[0].name;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      subject: [null, [Validators.required, Validators.maxLength(50)]],
      date: [null, [Validators.pattern(lengthStorageArea.dateValPattern), Validators.required]],
      hearFromId: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      amount: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }

  private load() {
    this.route.params.map(params => params.id).subscribe(id => {
      if (id) {
        this.ordersService.getOrder(id)
          .subscribe(order => {
            this.order = order;
            this.order.date = this.dateFormat.transform(order.date, 'YYYY-MM-DD');
            this.log.debug('成功获取订单！', order);
          }, error => this.log.error('订单获取失败。', error));
      }
    });
  }

  private getHearFroms() {
    this.hearFromsService.getHearFromList()
      .subscribe(response => {
        this.hearFromItems = response;
        this.hearFromItems.unshift({ id: null, name: '---请选择---' });
        this.log.debug('HearFroms 集合', this.hearFromItems);
      });
  }

}
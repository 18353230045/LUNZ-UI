import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Dialogs } from '../../../core/dialogs.service';
import { NgxDataTableDirective } from '../../../shared/directives/ngx-datatable.directive';

import { OrdersService } from '../../shared/orders.service';

declare const $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  log: Logger;
  loading = false;
  orders: Array<any>;
  queryTemplates: any = [{
    name: 'Default',
    template: {
      op: 'or',
      rules: [
        { field: 'subject', op: 'cn', data: '' },
        { field: 'Date', op: 'bt' },
        { field: 'Amount', op: 'eq' }
      ],
      groups: []
    }
  }];
  @ViewChild('appNgxDataTable')
  ngxDataTable: NgxDataTableDirective;

  private datatable: any;

  constructor(
    private ordersService: OrdersService,
    private changeDetectorRef: ChangeDetectorRef,
    private loggerFactory: LoggerFactory,
    private dialogs: Dialogs,
    private modalService: BsModalService) {
    this.log = this.loggerFactory.getLogger();
  };

  ngOnInit() { };

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
    this.ngxDataTable.refreshData();
    this.removeHeaderNull();
  };

  // 解决Edge浏览器下，ngx-datatable组件header处有'null'空值的现象
  removeHeaderNull() {
    $('.datatable-header-cell-label').each(function () {
      if ($(this).text() === 'null') {
        $(this).remove();
      }
    });
  };

  loadOrders(event: any) {
    const params: any = event.page;
    this.datatable = event.datatable;

    this.loading = true;
    this.ordersService.getOrders(params)
      .finally(() => this.loading = false)
      .subscribe(response => {
        this.datatable.count = response.count;
        this.orders = response.data;
        this.log.debug('订单列表', this.orders);
      }, error => {
        this.log.error('订单获取失败。', error);
      });
  };

  delete(row: any) {
    this.dialogs.confirm(`真的要删除 '${row.subject}' 吗？`).subscribe(
      () => {
        this.ordersService.deleteOrder(row)
          .subscribe(response => {
            this.ngxDataTable.refreshData();
            this.log.info('订单删除成功!', row);
          }, error => this.log.error('订单删除失败。', error));
      }, () => this.log.debug('取消删除订单。'));
  };

}

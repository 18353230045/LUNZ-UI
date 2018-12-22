import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { finalize } from 'rxjs/operators';

import { Logger } from '@core/logger.service';
import { Dialogs } from '@core/dialogs.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { OrdersService } from '../../shared/orders.service';

import { NgxDataTableDirective } from '@app/shared/directives/ngx-datatable.directive';

import { EditOrderModalComponent } from '../edit-order-modal/edit-order-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  log: Logger;
  loading = false;
  orders: Array<any>;
  selectedOrders: Array<any> = [];
  count: number | undefined;
  countParams: any;

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

  public datatable: any;

  constructor(
    private localeService: BsLocaleService,
    private ordersService: OrdersService,
    private changeDetectorRef: ChangeDetectorRef,
    private loggerFactory: LoggerFactory,
    private dialogs: Dialogs,
    private modalService: BsModalService) {
    this.log = this.loggerFactory.getLogger(`订单列表`);
    this.localeService.use('zh-cn');
  }

  ngOnInit() { }

  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

  onSelect(event: any) {
    if (event !== void 0 && event.selected !== void 0) {
      this.selectedOrders = event.selected;
    }
  }

  loadOrders(event: any) {
    const params: any = event.page;
    // this.countParams = event.page;

    this.datatable = event.datatable;
    this.loading = true;
    this.selectedOrders.length = 0;

    this.ordersService.getOrders(params).pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.datatable.count = response.count;
        this.orders = response.data;

        this.log.debug('订单列表', this.orders);
      }, error => {
        this.log.error('订单获取失败。', error);
      });
  }

  // 使用简洁翻页组件时，获取总条数
  showCount() {
    this.ordersService.getOrdersCount(this.countParams).subscribe(response => {
      this.count = response.count;
    });
  }

  delete(row: any) {
    this.dialogs.confirm(`真的要删除订单 ${row.subject} 吗？`).subscribe(
      () => {
        this.ordersService.deleteOrder(row)
          .subscribe(response => {
            this.ngxDataTable.refreshData();
            this.log.success(`订单 ${row.subject} 删除成功!`);
          }, error => this.log.error(`订单 ${row.subject} 删除失败,失败信息:`, error));
      }, (error) => this.log.debug(`订单 ${row.subject} 删除失败,失败信息:`, error));
  }

  editByModal(row: any) {
    const initialState = { data: row };
    this.modalService.show(EditOrderModalComponent, { initialState });

    const onHidden = this.modalService.onHidden.subscribe((val: any) => {
      // tslint:disable-next-line:forin
      for (const r in val) {
        row[r] = val[r];
      }

      onHidden.unsubscribe();
    });
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

  toggleExpandRow(row: any) {
    console.log('Toggled Expand Row!', row);
    this.datatable.rowDetail.toggleExpandRow(row);
  }
}

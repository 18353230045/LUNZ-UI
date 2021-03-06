import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  log: Logger;
  title = '订单详细';
  form: FormGroup;
  order: any = {};
  hearFromItems: Array<any> = [
    { key: 1, text: '广告' },
    { key: 2, text: '传单' },
    { key: 3, text: '朋友' }
  ];

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private loggerFactory: LoggerFactory,
    private ordersService: OrdersService) {
    this.log = this.loggerFactory.getLogger(`订单详情`);
  }

  ngOnInit() { this.load(); }

  private load() {
    this.route.params.pipe(map(params => params.id))
      .subscribe(id => {
        if (id) {
          this.ordersService.getOrder(id)
            .subscribe(order => {
              this.order = order;
            }, error => this.log.error(`订单数据获取失败,失败信息: ${error}`));
        }
      });
  }
}

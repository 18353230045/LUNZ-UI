import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';

import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  log: Logger;
  title = '订单详细';
  order: any = {};
  itemHaving = false;

  constructor(private ordersService: OrdersService,
    private loggerFactory: LoggerFactory,
    private router: Router, private route: ActivatedRoute,
    public location: Location, ) {
    this.log = this.loggerFactory.getLogger();
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.route.params.map(params => params.id).subscribe(id => {
      if (id) {
        this.ordersService.getOrder(id)
          .subscribe(order => {
            this.order = order;
            this.itemHaving = this.order.items.length > 0;
            this.log.debug('成功获取订单！', order);
          }, error => this.log.error('订单获取失败。', error));
      }
    });
  }

}

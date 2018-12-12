import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { IOption } from 'ng-select';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';
import { Select2Service } from '../../shared/select2.service';

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.scss']
})

export class Select2Component implements OnInit, AfterViewInit {
  log: Logger;

  customers: Array<IOption> = [];
  handlerCustomer: any;
  customer: any;
  selectedCars: any;
  cars: any[];

  config = { displayKey: 'name', search: true };

  // 异步demo,异步查询参数实体
  queryCustModel = {
    context: '',
    qxentity: { type: '1', iskehu: false, parid: '', relationids: new Array<any>(), userid: '' }
  };

  @ViewChild('customerInput')
  customerInput: ElementRef;

  constructor(
    private loggerFactory: LoggerFactory,
    private select2Service: Select2Service) {
    this.log = this.loggerFactory.getLogger(`select2`);
  }

  ngOnInit() {
    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];

  }

  ngAfterViewInit() {
    this.asynGetData();
  }

  // asynGetData
  asynGetData() {
    const source = fromEvent(this.customerInput.nativeElement, 'input');

    source.pipe(debounceTime(500)).subscribe((event: any) => {
      if (event.target.value) {
        this.queryCustModel.context = event.target.value;
        this.select2Service.getCustomerByTextSameName(this.queryCustModel)
          .subscribe((custItems: any) => {
            const custlist = Array<any>();
            custItems.forEach((options: any) => {
              custlist.push({ value: options.id, label: options.customerFullName, });
            });
            this.customers = custlist;
          }, error => {
            this.log.error(error);
          });
      }
    });
  }

  handler(event: any) {
    this.handlerCustomer = event;
  }
}

import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IOption } from 'ng-select';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Select2Service } from '../../shared/select2.service';

@Component({
    selector: 'app-select2',
    templateUrl: './select2.component.html',
    styleUrls: ['./select2.component.scss']
})

export class Select2Component implements OnInit, AfterViewInit {
    log: Logger;

    dropdownOptions: Array<any> = [];
    customers: Array<IOption> = [];

    dataModel1: any;
    dataModel2: any;
    dataModel3: any;

    customer: any;
    handlerCustomer: any;

    config = {
        displayKey: 'name',
        search: true
    };

    // 异步demo 客户异步查询参数实体
    queryCustModel = {
        context: '',
        qxentity: { type: '1', iskehu: false, parid: '', relationids: new Array<any>(), userid: '' }
    };

    @ViewChild('customerInput')
    customerInput: ElementRef;

    constructor(
        private loggerFactory: LoggerFactory,
        private select2Service: Select2Service
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.dropdownOptions = [
            { '_id': '5a66d', 'index': 0, 'name': 'Burns Dalton' },
            { '_id': '5a66d6', 'index': 1, 'name': 'Acintyre Lawson' },
            { '_id': '5a66ds', 'index': 2, 'name': 'Dcintyre Ujojson' },
            { '_id': '5a66d6c', 'index': 3, 'name': 'Pcintyre Ejkwson' }
        ];

    };

    ngAfterViewInit() {
        this.asynGetData();
    };

    selectionChanged(event: any) {
        this.log.debug(event);
    };

    // asynGetData
    asynGetData() {
        Observable.fromEvent(this.customerInput.nativeElement, 'input').debounceTime(400).subscribe((event: any) => {
            if (event.target.value) {
                this.queryCustModel.context = event.target.value;
                this.select2Service.getCustomerByTextSameName(this.queryCustModel)
                    .subscribe((custItems: any) => {
                        const custlist = Array<any>();
                        custItems.forEach((options: any) => {
                            custlist.push({
                                value: options.id,
                                label: options.customerFullName,
                            });
                        });
                        this.customers = custlist;
                    }, error => {
                        this.log.error(error);
                    });
            }
        });
    };

    handler(event: any) {
        this.handlerCustomer = event;
    };
};

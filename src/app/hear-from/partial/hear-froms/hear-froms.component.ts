import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { Dialogs } from '../../../core/dialogs.service';
import { NgxDataTableDirective } from '../../../shared/directives/ngx-datatable.directive';

import { HearFromsService } from '../../shared/hear-froms.service';
import { IQueryGroup, IHearFromDetails } from '../../../shared/models/microservice-template';

declare const $: any;

@Component({
  selector: 'app-hear-froms',
  templateUrl: './hear-froms.component.html',
  styleUrls: ['./hear-froms.component.scss']
})
export class HearFromsComponent implements OnInit, AfterViewInit {

  log: Logger;
  loading = false;
  hearfroms: Array<IHearFromDetails>;
  queryTemplates: any = [{
    name: 'Default',
    template: {
      op: 'or',
      rules: [
        { field: 'name', op: 'cn', data: '' }
      ],
      groups: []
    }
  }];
  @ViewChild('appNgxDataTable')
  ngxDataTable: NgxDataTableDirective;

  public datatable: any;

  constructor(private hearFromsService: HearFromsService,
    private changeDetectorRef: ChangeDetectorRef,
    private loggerFactory: LoggerFactory,
    private dialogs: Dialogs) {
    this.log = this.loggerFactory.getLogger();
  };

  ngOnInit() { };

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
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

  loadHearfroms(event: any) {
    const params: IQueryGroup = event.page;
    this.datatable = event.datatable;

    this.loading = true;
    this.hearFromsService.getHearFroms(params)
      .finally(() => this.loading = false)
      .subscribe(response => {
        this.datatable.count = response.count;
        this.hearfroms = response.data;
        this.log.debug('从哪里听说列表', response);
      }, error => {
        this.log.error('从哪里听说获取失败。', error);
      });
  };

  delete(row: IHearFromDetails) {
    this.dialogs.confirm(`真的要删除 '${row.name}' 吗？`).subscribe(
      () => {
        this.hearFromsService.deleteHearFrom(row)
          .subscribe(response => {
            this.ngxDataTable.refreshData();
            this.log.info('删除成功!', row);
          }, error => this.log.error('删除失败。', error));
      }, () => this.log.debug('取消删除。'));
  };

}

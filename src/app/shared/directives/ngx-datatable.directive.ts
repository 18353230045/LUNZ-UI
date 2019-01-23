import {
  Directive, OnInit, AfterViewInit, Input, Output,
  ViewContainerRef, EventEmitter, ContentChild, OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import { timer, Subscription } from 'rxjs';
import { NgxQueryComponent, cloneQueryGroup } from '@zhongruigroup/ngx-query';
import { DatatableFooterComponent } from 'ngx-datatable-footer';
import { NgxDatatableActionsComponent } from 'ngx-datatable-actions';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable/release/types';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';
import { CreateSubscriptionService } from '@app/shared/services/create-subscription.service';

declare const $: any;

@Directive({
  selector: '[appNgxDataTable]',
  exportAs: 'NgxDataTableDirective'
})
export class NgxDataTableDirective implements OnInit, AfterViewInit, OnDestroy {

  @Output() data: EventEmitter<any> = new EventEmitter();

  @Input() rowHeight = 44;
  @Input() saveState = true;
  @Input() externalPaging = true;
  @Input() ngxQuery: NgxQueryComponent;
  @Input()
  set pageSize(val: number) {
    if (val < 1) {
      throw new Error(`The value '${val}' can't be less than 1.`);
    }

    this._pageSize = val;
    if (this._datatable) {
      this._datatable.limit = this._pageSize;
    }
  }
  get pageSize(): number {
    return this._pageSize;
  }
  @Input()
  set pageIndex(val: number) {
    if (val < 1) {
      throw new Error(`The value '${val}' can't be less than 1.`);
    }

    this._pageIndex = val;
    if (this._datatable) {
      this._datatable.offset = this._pageIndex;
    }
  }
  get pageIndex(): number {
    return this._pageIndex;
  }

  @ContentChild(DatatableFooterComponent) footer: DatatableFooterComponent;
  @ContentChild(NgxDatatableActionsComponent) toolbar: NgxDatatableActionsComponent;

  private _pageSize = 10;
  private _pageIndex = 1;
  private _sorts: any[] = [];
  private _tempQueryTemplates: any;
  private _datatable: DatatableComponent;
  private clickLeftMenuTopIcon$: Subscription;

  constructor(
    private router: Router,
    private _view: ViewContainerRef,
    private subscriptionService: CreateSubscriptionService) {
  }

  ngOnInit() {
    if (this.saveState === true) {
      this.loadCachePaging();
    }
    this._datatable = (<any>this._view)._data.componentView.component;
    this.initialize(this._datatable, this.ngxQuery);

    this.clickLeftMenuTopIcon$ = this.subscriptionService.refreshNgxDateTableData$.subscribe(() => this.refreshData());
  }

  ngAfterViewInit() {
    this.removeHeaderNull();

    this.emitData();
  }

  // 解决Edge浏览器下，ngx-datatable组件header处有'null'空值的现象
  public removeHeaderNull() {
    $('.datatable-header-cell-label').each(function () {
      if ($(this).text() === 'null') $(this).remove();
    });
  }

  public refreshData() {
    this.emitData();
  }

  private initialize(datatable: DatatableComponent, ngxQuery: NgxQueryComponent): void {

    // datatable
    datatable.headerHeight = 40;
    datatable.footerHeight = 40;
    datatable.scrollbarV = false;
    datatable.limit = this._pageSize;
    datatable.sortType = SortType.multi;
    datatable.rowHeight = this.rowHeight;
    datatable.offset = this._pageIndex - 1;
    datatable.columnMode = ColumnMode.force;
    datatable.externalPaging = this.externalPaging;

    if (this.footer) {
      this.footer.datatable = datatable;
    }

    if (this._sorts && this._sorts.length > 0) {
      datatable.sorts = this._sorts;
    }

    datatable.messages = {
      emptyMessage: '当前无记录。',
      totalMessage: '行',
      selectedMessage: '选择'
    };

    datatable.page.subscribe((event: any) => {
      if (event.offset || event.offset === 0) this.emitData(event);
    });

    datatable.sort.subscribe((event: any) => {
      this.emitData(undefined, event.sorts);
    });

    // query
    if (ngxQuery) {
      ngxQuery.query.subscribe((event: any) => {
        this._datatable.offset = 0;
        this.emitData(undefined, []);
      });

      ngxQuery.reset.subscribe(() => {
        timer(100).subscribe(() => {
          this._datatable.offset = 0;
          this.emitData(undefined, []);
        });
      });

      if (this.saveState === true) {
        ngxQuery.reset.subscribe(() => {
          ngxQuery.queryTemplates = this._tempQueryTemplates;
        });
      }
    }
  }

  private emitData(page?: any, sorts?: any[]) {
    // page
    if (page === undefined) {
      page = {
        limit: this.pageSize,
        offset: this.pageIndex - 1
      };
    } else {
      this._pageSize = page.limit;
      this._pageIndex = page.offset + 1;
    }
    // sort
    if (sorts === undefined) {
      sorts = this._datatable.sorts;
    } else {
      page.offset = 0;
      this._pageIndex = page.offset + 1;
    }
    const sortArray = [];
    for (const sort of sorts) {
      sortArray.push({
        field: sort.prop,
        sort: sort.dir
      });
    }
    // query
    const query = this.getQuery();

    // cache
    if (this.saveState === true) {
      let rules;

      if (this.ngxQuery) {
        rules = this.ngxQuery.getOriginalQuery().rules;
      } else {
        rules = '';
      }

      const paging = {
        pageSize: page.limit,
        pageIndex: page.offset + 1 || 1,
        sorts: sorts,
        filters: query.filters,
        rules: rules
      };
      sessionStorage.setItem(this.router.url + '|saveState|dt', JSON.stringify(paging));
    }

    // event
    this.data.emit({
      datatable: this._datatable,
      // event: event,
      page: {
        pageSize: page.limit,
        pageIndex: page.offset + 1 || 1,
        sort: sortArray,
        filters: query.filters,
        filter: query.query
      },
      query: query
    });
  }

  private getQuery(): any {
    const result: any = {
      filters: []
    };

    if (this.ngxQuery) {
      let query = this.ngxQuery.getQuery();
      if (query === undefined) {
        query = this.ngxQuery.queryTemplates[0].template;
      }
      result.query = query;

      if (query && query.rules && query.rules.length > 0) {

        for (const rule of query.rules) {
          if (rule.op === 'bt' && rule.datas && rule.datas.length > 1) {
            if (rule.datas[0] && rule.datas[0] !== null &&
              rule.datas[0] !== '' && rule.datas[0] !== undefined) {
              result.filters.push({
                field: rule.field,
                op: 'ge',
                term: rule.datas[0]
              });
            }
            if (rule.datas[1] && rule.datas[1] !== null &&
              rule.datas[1] !== '' && rule.datas[1] !== undefined) {
              result.filters.push({
                field: rule.field,
                op: 'le',
                term: rule.datas[1]
              });
            }
          } else {
            if (rule.data && rule.data !== null && rule.data !== '' && rule.data !== undefined) {
              result.filters.push({
                field: rule.field,
                op: rule.op,
                term: rule.data
              });
            }
          }
        }
      }
    }

    return result;
  }

  private loadCachePaging() {

    if (this.ngxQuery) {
      this._tempQueryTemplates = [{
        name: this.ngxQuery.queryTemplates[0].name,
        template: cloneQueryGroup(this.ngxQuery.queryTemplates[0].template)
      }];
    }

    const paging = JSON.parse(sessionStorage.getItem(this.router.url + '|saveState|dt'));

    if (paging) {
      // page
      this._pageIndex = paging.pageIndex;
      this._pageSize = paging.pageSize;
      // query
      if (paging.filters && paging.filters.length > 0 && paging.rules) {
        this.ngxQuery.queryTemplates[0].template.rules = paging.rules;
      }
      // sort
      if (paging.sorts && paging.sorts.length > 0) {
        this._sorts = paging.sorts;
      }
    }
  }

  ngOnDestroy() {
    this.clickLeftMenuTopIcon$.unsubscribe();
  }
}

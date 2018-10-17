import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-datatable-pager-simple',
  templateUrl: './ngx-datatable-pager-simple.component.html',
  styleUrls: ['./ngx-datatable-pager-simple.component.scss']
})
export class NgxDatatablePagerSimpleComponent {
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() datatable: any;

  @Input()
  set size(val: number) {
    this._size = val;
  };
  get size(): number {
    return this._size;
  };

  @Input() count: number;

  @Input()
  set page(val: number) {
    this._page = val;
  };
  get page(): number {
    return this._page || 1;
  };

  @Output() change: EventEmitter<any> = new EventEmitter();

  _page = 1;
  _size = 0;

  totalPages(): number {
    if (this.count) {
      const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
      return Math.max(count || 0, 1);
    } else {
      if (this.datatable.rows.length < this.size) {
        return this.page - 1;
      } else {
        return this.page + 1;
      };
    };
  };

  canNext(): boolean {
    if (this.count) {
      return this.page >= Math.ceil(this.count / this.size);
    } else if (this.datatable.rows) {
      return this.datatable.rows.length < this.size;
    };
  };

  prevPage(): void {
    this.selectPage(this.page - 1);
  };

  nextPage(): void {
    this.selectPage(this.page + 1);
  };

  selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.page = page;
      this.change.emit({
        page
      });
    }
  };
};

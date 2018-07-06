import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ngx-datatable-pager',
  templateUrl: './ngx-datatable-pager.component.html',
  styleUrls: ['./ngx-datatable-pager.component.scss'],
  host: {
    class: 'datatable-pager'
  }
})
export class NgxDatatablePagerComponent {
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;
  @Input() pSize: number;
  @Input() pageSizeArray?: any[] = [10, 20, 30, 40, 50];
  @Input() datatable: any;

  @Input()
  set size(val: number) {
    this._size = val;
    this.pages = this.calcPages();
  }
  get size(): number {
    return this._size;
  }

  @Input()
  set count(val: number) {
    this._count = val;
    this.pages = this.calcPages();
  }
  get count(): number {
    return this._count;
  }

  @Input()
  set page(val: number) {
    this._page = val;
    this.pages = this.calcPages();
  }
  get page(): number {
    return this._page;
  }
  get totalPages(): number {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }

  @Output() change: EventEmitter<any> = new EventEmitter();

  _page = 1;
  _count = 0;
  _size = 0;
  pages: any;
  pageSizeColumn: Boolean = true;

  canPrevious(): boolean {
    return this.page > 1;
  }

  canNext(): boolean {
    return this.page < this.totalPages;
  }

  prevPage(): void {
    this.selectPage(this.page - 1);
  }

  nextPage(): void {
    this.selectPage(this.page + 1);
  }

  selectPage(page: number, changePageSize?: any): void {
    if (changePageSize) {
      if (page > 0 && page <= this.totalPages) {
        this.page = page;
        this.change.emit({
          page
        });
      }
    } else {
      if (page > 0 && page <= this.totalPages && page !== this.page) {
        this.page = page;
        this.change.emit({
          page
        });
      }
    }
  };

  calcPages(page?: number): any[] {
    const pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;

    page = page || this.page;

    if (isMaxSized) {
      startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
      endPage = Math.min(startPage + maxSize - 1, this.totalPages);
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: <string><any>num
      });
    }

    return pages;
  }

  changePageSize(pageSize: number) {
    this.datatable.limit = pageSize;
    this.selectPage(1, 'changePageSize');
  };

}

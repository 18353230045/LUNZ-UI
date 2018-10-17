import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

@Component({
  selector: 'ngx-datatable-footer-simple',
  templateUrl: './ngx-datatable-footer-simple.component.html',
  styleUrls: ['./ngx-datatable-footer-simple.component.scss']
})
export class NgxDatatableFooterSimpleComponent implements OnInit {

  @ViewChild(TemplateRef)
  set template(val: TemplateRef<any>) {
    this._template = val;
    this.update();
  }
  get template(): TemplateRef<any> {
    return this._template;
  }

  @Input() count: number;

  @Input()
  set datatable(val: DatatableComponent) {
    this._datatable = val;
    this.update();
  }
  get datatable(): DatatableComponent {
    return this._datatable;
  }

  @Output() display = new EventEmitter();

  displayNumber: boolean = false;
  private _template: TemplateRef<any>;
  private _datatable: DatatableComponent;

  constructor() {
  };

  ngOnInit() {
  };

  trggerDisplayNumber() {
    this.display.emit();
    const timer = setInterval(() => {
      if (this.count) {
        clearInterval(timer);
        this.displayNumber = true;
      };
    }, 100);
  };

  private update(): void {
    if (this._datatable && this._template
      && (!this._datatable.footer || !this._datatable.footer.template)) {
      if (this._datatable.footer) {
        this._datatable.footer.template = this._template;
      } else {
        this._datatable.footer = {
          footerHeight: this._datatable.footerHeight,
          totalMessage: this._datatable.messages.totalMessage,
          selectedMessage: this._datatable.messages.selectedMessage,
          pagerLeftArrowIcon: '',
          pagerRightArrowIcon: '',
          pagerPreviousIcon: '',
          pagerNextIcon: '',
          template: this._template
        };
      }
    }
  };
}

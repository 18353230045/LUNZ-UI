import { Directive, OnInit, AfterViewInit, Input, ElementRef, ViewContainerRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

import { ProfileService } from '../../core/profile/profile.service';

interface IWidget {
  cId: any;
  parentId?: any;
  id: string;
  authorised: boolean;
  children: boolean;
}

@Directive({
  selector: '[appApplyPermission]'
})

export class ApplyPermissionDirective implements OnInit, AfterViewInit {

  @Input('appApplyPermission') elementId: string;

  private _menuItems: Array<any>;
  private _ngUrl: string;
  private _datatable: DatatableComponent;

  constructor(
    private router: Router,
    private _el: ElementRef,
    private renderer: Renderer,
    private _view: ViewContainerRef,
    private profileService: ProfileService) {
  }

  ngOnInit() {
    this._ngUrl = this.router.url;
  }

  ngAfterViewInit() {
    if (this.elementId) {
      this.apply();
    }
  }

  private apply(): void {
    if (localStorage.getItem(`moduleTree`)) {
      this._menuItems = JSON.parse(localStorage.getItem(`moduleTree`));
      if (this._menuItems) {
        const currentPage = this.getCurrentPage(this._menuItems, this._ngUrl);
        if (currentPage && currentPage.widgets && currentPage.widgets.length > 0) {
          this.applyPermission(currentPage.widgets);
        }
      }
    } else {
      this.profileService.getMenus()
        .subscribe(menuItems => {
          this._menuItems = menuItems;
          if (this._menuItems) {
            const currentPage = this.getCurrentPage(this._menuItems, this._ngUrl);
            if (currentPage && currentPage.widgets && currentPage.widgets.length > 0) {
              this.applyPermission(currentPage.widgets);
            }
          }
        }, error => { });
    }
  }

  private applyPermission(widgets: IWidget[]) {

    const s_widget = widgets.filter(w => {
      return w.id === this.elementId;
    });

    if (s_widget && s_widget.length > 0) {
      const widget = s_widget[0];

      if (widget.authorised === false) {
        this.renderer.invokeElementMethod(this._el.nativeElement, 'remove');
      }
      if (widget.authorised === true && widget.children === true) {
        const c_widget = widgets.filter(w => {
          return w.parentId === widget.cId && w.authorised === false;
        });
        this._datatable = (<any>this._view)._data.componentView.component;
        if (this._datatable && c_widget && c_widget.length > 0) {
          this.applyTableColumn(this._datatable, c_widget);
        }
      }
    }
  }

  private applyTableColumn(datatable: DatatableComponent, columns: IWidget[]): void {
    const props: string[] = [];
    columns.forEach(c => {
      props.push(c.id);
    });
    const v_columns = datatable.columns.filter(c => {
      return (!c.prop) || (c.prop && props.indexOf(c.prop.toString()) === -1);
    });
    datatable.columns = v_columns;
    if (datatable['ngx-datatable-actions']) {
      datatable['ngx-datatable-actions'] = v_columns;
    }
  }

  private getCurrentPage(menuItems: any, ngUrl: string): any {
    let result: any;
    if (menuItems === undefined || ngUrl === undefined) {
      return result;
    }
    for (const menuItem of menuItems) {
      if (menuItem.ngUrl === ngUrl) {
        result = menuItem;
        break;
      } else {
        result = this.getCurrentPage(menuItem.children, ngUrl);
        if (result !== null && result !== undefined) {
          result.Parent = menuItem;
          break;
        }
      }
    }
    return result;
  }
}

import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

import { Logger } from '@core/logger.service';
import { Dialogs } from '@core/dialogs.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { RoleService } from '../../shared/role.service';
import { Role } from '../../interface/interface';
import { NgxDataTableDirective } from '@app/shared/directives/ngx-datatable.directive';

import { CreateRoleComponent } from '../../partial/create-role/create-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, AfterViewInit {
  log: Logger;
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  datatable: DatatableComponent;
  loading: boolean = false;
  editing: any = {};

  @ViewChild('appNgxDataTable') ngxDataTable: NgxDataTableDirective;

  constructor(
    private dialogs: Dialogs,
    private roleService: RoleService,
    private loggerFactory: LoggerFactory,
    private modalService: BsModalService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.log = this.loggerFactory.getLogger(`角色列表`);
  }

  ngOnInit() { }

  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

  // Load roles
  loadRoles(event: any) {
    const params = event.page;

    this.datatable = event.datatable;
    this.loading = true;

    this.roleService.getAppRoles(params)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.roles = response.data || [];
        this.datatable.count = response.count;
      }, error => this.log.error(`角色列表获取失败`, error));
  }

  // Select role
  onSelect(event: any) {
    if (event !== void 0 && event.selected !== void 0) this.selectedRoles = event.selected;
  }

  // Create role
  createRole() {
    this.modalService.show(CreateRoleComponent, { ignoreBackdropClick: true });

    const onHidden = this.modalService.onHidden
      .subscribe((val: boolean) => {
        if (val === true) this.ngxDataTable.refreshData();
        onHidden.unsubscribe();
      });
  }

  // Edit role
  editRole(cell: string, rowIndex: number, row: Role) {
    if (row.name === row.shortName) {
      this.editing[rowIndex + '-' + cell] = false;
    } else {
      this.roleService.updateRole(row)
        .subscribe(response => {
          if (response.Success === false) {
            this.log.info(`${response.AllMessages}`);
          } else {
            this.log.success('角色创建成功!');
            this.ngxDataTable.refreshData();
            this.editing[rowIndex + '-' + cell] = false;
          }
        }, error => {
          this.log.error('角色编辑失败！', error);
          this.editing[rowIndex + '-' + cell] = false;
        });
    }

  }

  // Delete role
  deleteRole(row?: Role) {
    const ids: string[] = [];

    if (row) {
      ids.push(row.id);
    } else {
      this.selectedRoles.forEach(item => ids.push(item.id));
    }

    this.dialogs.confirm(`真的要删除选择的角色吗？`)
      .subscribe(() => {
        this.roleService.deleteRole(ids)
          .subscribe(() => {
            this.ngxDataTable.refreshData();
            this.log.success(`角色删除成功!`);
            this.selectedRoles.length = 0;
          }, error => this.log.error(`角色删除失败`, error));
      }, () => this.log.debug(`取消删除角色`));
  }

}

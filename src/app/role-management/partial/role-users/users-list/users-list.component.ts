import {
  Component, OnInit, Input, OnChanges, SimpleChanges,
  ViewChild, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeNode } from 'primeng/api';
import { map, finalize } from 'rxjs/operators';
// import { NgxQueryToolbarComponent } from 'ngx-query-toolbar';
import { NgxQueryComponent } from 'ngx-query';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

import { Logger } from '@core/logger.service';
import { Dialogs } from '@core/dialogs.service';
import { RoleService } from '../../../shared/role.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { RoleUser } from '../../../interface/interface';
import { NgxDataTableDirective } from '@app/shared/directives/ngx-datatable.directive';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() company: TreeNode;
  @Input() update: boolean = false;

  log: Logger;
  loading: boolean = false;
  roleUsers: RoleUser[] = [];
  selectedRoleUsers: RoleUser[] = [];
  params: any;
  roleId: string;
  departmentId: string;

  queryTemplates: any = [{
    name: 'Default',
    template: {
      op: 'or',
      rules: [
        { field: 'Sys_User.Name', op: 'cn', data: '' }
      ],
      groups: []
    },
  }];

  datatable: DatatableComponent;

  @ViewChild('appNgxDataTable')
  ngxDataTable: NgxDataTableDirective;

  @ViewChild('ngxQuery')
  ngxQuery: NgxQueryComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogs: Dialogs,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`角色用户`);
  }

  ngOnInit() {
    // Get roleId
    this.activatedRoute.params.pipe(map(params => params.id)).subscribe(id => this.roleId = id);
  }

  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

  ngOnChanges(change: SimpleChanges) {
    if (change.company && change.company.currentValue) {
      this.departmentId = change.company.currentValue.id;
      this.ngxQuery.reset.emit();
    }

    if (change.update && change.update.currentValue && !change.update.firstChange) {
      this.loadRoleUsers();
    }
  }

  loadRoleUsers(event?: any) {
    console.log(1);
    this.params = event ? event.page : this.params;
    this.datatable = event ? event.datatable : this.datatable;
    if (!this.departmentId) return;

    this.loading = true;
    this.roleService.getRoleUsers(this.params, this.roleId, this.departmentId).pipe(finalize(() => {
      this.loading = false;
    })).subscribe((response) => {
      if (response.data && response.data.length > 0) {
        this.datatable.count = response.count;
        this.roleUsers = response.data || [];
      } else {
        this.datatable.count = 0;
        this.roleUsers = [];
      }
    }, error => { this.log.error('角色用户列表获取失败。', error); });
  }

  onSelect(event: any) {
    if (event !== void 0 && event.selected !== void 0) {
      this.selectedRoleUsers = event.selected;
    }
  }

  // Delete role
  // deleteRoleUser(row: RoleUser) {

  //   const ids: string[] = [];

  //   if (row) {
  //     ids.push(row.id);
  //   } else {
  //     this.selectedRoles.forEach(item => { ids.push(item.id); });
  //   }
  //   this.dialogs.confirm(`真的要删除选择的角色吗？`).subscribe(
  //     () => {
  //       this.roleService.deleteRole(ids)
  //         .subscribe(response => {
  //           this.ngxDataTable.refreshData();
  //           this.log.success(`角色删除成功!`);
  //           this.selectedRoles.length = 0;
  //         }, error => this.log.error(`角色删除成功`, error));
  //     }, (error) => this.log.debug(`角色删除成功`, error));
  // }

}

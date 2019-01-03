import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOption } from 'ng-select';
import { TreeNode } from 'primeng/api';
import { Logger } from '@core/logger.service';
import { map, finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

import { RoleService } from '../../shared/role.service';
import { Dialogs } from '@core/dialogs.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { Node, Department, RoleUser } from '../../interface/interface';
import { NgxDataTableDirective } from '@app/shared/directives/ngx-datatable.directive';

import { AddRoleUsersComponent } from '../add-role-users/add-role-users.component';

@Component({
  selector: 'app-role-users',
  templateUrl: './role-users.component.html',
  styleUrls: ['./role-users.component.scss']
})
export class RoleUsersComponent implements OnInit, AfterViewInit {
  log: Logger;
  nodeTrees: TreeNode[] = [];
  roleUsers: RoleUser[] = [];
  mechanismList: IOption[] = [];
  departmentList: Department[] = [];
  selectedRoleUsers: RoleUser[] = [];
  selectedNode: TreeNode;
  roleId: string;
  departmentId: string;
  loading: boolean = false;
  loadingTree: boolean = false;

  params: any;

  datatable: DatatableComponent;

  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogs: Dialogs,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`角色用户`);
  }

  @ViewChild('appNgxDataTable')
  ngxDataTable: NgxDataTableDirective;

  ngOnInit() {
    // Get roleId
    this.activatedRoute.params.pipe(map(params => params.id)).subscribe(id => this.roleId = id);

    // Get department type list
    this.loadDepartmentTypeList();
  }

  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

  // Load department type list(select)
  loadDepartmentTypeList() {
    this.roleService.getDepartmentTypeList().subscribe(response => {
      const mechanismList: IOption[] = [];

      for (const res of response) {
        mechanismList.push({ label: res.name, value: res.id });
      }

      this.mechanismList = mechanismList;
    }, error => {
      this.log.error('部门类型获取失败。', error);
    });
  }

  // Process the returned tree node data
  processingNodeData(item: Node) {
    return {
      label: item.text,
      id: item.id,
      icon: item.children ? 'fa fa-th-large' : 'fa fa-th',
      leaf: item.children ? false : true,
      parentId: item.parentId
    };
  }

  // Get depert list(tree)
  getRootDepertList(row: IOption) {
    const id = row.value;
    this.loadingTree = true;

    this.roleUsers.length = 0;
    this.selectedRoleUsers.length = 0;
    this.datatable.count = 0;
    this.selectedNode = undefined;

    this.roleService.getRootDepertList(id).subscribe((response: any) => {
      this.loadingTree = false;
      const node = [];
      for (const res of response) {
        const oneData = this.processingNodeData(res);
        node.push(oneData);
      }
      this.nodeTrees = node;
    }, (error: any) => this.log.error('数据获取失败。', error));

  }

  // Get deper child list(tree)
  getDeperChildtList(event: any) {
    const id = event.node.id;
    this.loading = true;

    this.roleService.getChildDepertList(id).subscribe(response => {
      this.loading = false;
      const nodeChild = [];
      for (const res of response) {
        const nodeItem = this.processingNodeData(res);
        nodeChild.push(nodeItem);
      }
      event.node.children = nodeChild;
    }, (error: any) => this.log.error('子级获取失败。', error));
  }

  loadRoleUsers(event?: any) {
    if (event) {
      this.params = event.page;
      this.datatable = event.datatable;
    } else {
      this.datatable.offset = 0;
      this.params.pageIndex = 1;
    }

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

  nodeSelect(event: any) {
    this.departmentId = event.node.id;
    this.loadRoleUsers();
  }

  onSelect(event: any) {
    if (event !== void 0 && event.selected !== void 0) {
      this.selectedRoleUsers = event.selected;
    }
  }

  // Add role users
  addRoleUsers() {
    const config = {
      initialState: { departId: this.selectedNode['id'], roleId: this.roleId },
      class: 'modal-lg',
      ignoreBackdropClick: true
    };
    this.modalService.show(AddRoleUsersComponent, config);

    const onHidden = this.modalService.onHidden.subscribe((val: boolean) => {
      if (val) {
        this.ngxDataTable.refreshData();
        this.selectedRoleUsers.length = 0;
      }
      onHidden.unsubscribe();
    });
  }

  // remove role users
  removeRoleUsers(row?: RoleUser) {
    const ids: string[] = [];

    if (row) {
      ids.push(row.id);
    } else {
      this.selectedRoleUsers.forEach(item => { ids.push(item.id); });
    }
    this.dialogs.confirm(`真的要删除选择的角色用户吗？`).subscribe(
      () => {
        this.roleService.deleteRoleUsers(ids)
          .subscribe(response => {
            this.ngxDataTable.refreshData();
            this.log.success(`角色用户删除成功!`);
            this.selectedRoleUsers.length = 0;
          }, error => this.log.error(`角色用户删除成功`, error));
      }, (error) => this.log.debug(`角色用户删除成功`, error));
  }
}

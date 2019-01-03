import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, Input } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { NgxDataTableDirective } from '@app/shared/directives/ngx-datatable.directive';

import { User } from '../../interface/interface';
import { RoleService } from '../../shared/role.service';

@Component({
  selector: 'app-add-role-users',
  templateUrl: './add-role-users.component.html',
  styleUrls: ['./add-role-users.component.scss']
})
export class AddRoleUsersComponent implements OnInit, AfterViewInit {
  @Input() roleId: string;
  @Input() departId: string;

  log: Logger;
  loading: boolean = false;
  saving: boolean = false;
  users: User[] = [];
  selectedUsers: User[] = [];
  datatable: DatatableComponent;
  queryTemplates: any = [{
    name: 'Default',
    template: {
      op: 'or',
      rules: [
        { field: 'LoginName', op: 'cn', data: '' },
        { field: 'Name', op: 'cn', data: '' }
      ],
      groups: []
    }
  }];

  @ViewChild('appNgxDataTable')
  ngxDataTable: NgxDataTableDirective;

  constructor(
    private roleService: RoleService,
    private loggerFactory: LoggerFactory,
    public modalService: BsModalService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.log = this.loggerFactory.getLogger(`角色列表`);
  }

  ngOnInit() { }

  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

  // Load users
  loadUsers(event: any) {
    const params = event.page;

    this.datatable = event.datatable;
    this.loading = true;

    this.roleService.getUserList(params, this.departId).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(response => {
      this.users = response.data || [];
      this.datatable.count = response.count;

    }, error => {
      this.log.error(`角色列表获取失败，${error}`);
    });
  }

  // Select role
  onSelect(event: any) {
    if (event !== void 0 && event.selected !== void 0) {
      this.selectedUsers = event.selected;
    }
  }

  submit() {
    const entity = { RoleId: this.roleId, UserIds: <any>[] };

    this.selectedUsers.forEach((item) => {
      entity['UserIds'].push(item.id);
    });

    this.saving = true;
    this.roleService.addUsersToRole(entity)
      .subscribe(() => {
        this.saving = false;
        this.modalService.onHidden.emit(true);
        this.modalService.hide(1);
      }, error => {
        this.log.error(error);
      });
  }

}

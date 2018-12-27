import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from 'ng-select';
import { NgxQueryModule } from 'ngx-query';
import { ModalModule } from 'ngx-bootstrap';
import { ZrDatepickerModule } from 'zr-datepicker';
import { NgxQueryToolbarModule } from 'ngx-query-toolbar';
import { MomentModule } from 'angular2-moment/moment.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDatatableFooterModule } from 'ngx-datatable-footer';
import { NgxDatatableActionsModule } from 'ngx-datatable-actions';
import { ZrValidationMessageModule } from 'zr-validation-message';

import { SharedModule } from '../shared/shared.module';
import { RoleManagementRoutingModule } from './role-management-routing.module';

import { RolesComponent } from './partial/roles/roles.component';
import { CreateRoleComponent } from './partial/create-role/create-role.component';
import { EditRoleComponent } from './partial/edit-role/edit-role.component';
import { RoleMenusComponent } from './partial/role-menus/role-menus.component';
import { RoleUsersComponent } from './partial/role-users/role-users.component';

import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    NgxQueryModule,
    ModalModule.forRoot(),
    ZrDatepickerModule,
    NgxQueryToolbarModule,
    MomentModule,
    NgxDatatableModule,
    BsDatepickerModule,
    NgxDatatableFooterModule,
    NgxDatatableActionsModule,
    ZrValidationMessageModule,
    SharedModule,
    RoleManagementRoutingModule
  ],
  declarations: [
    RolesComponent,
    CreateRoleComponent,
    EditRoleComponent,
    RoleMenusComponent,
    RoleUsersComponent
  ],
  entryComponents: [
    CreateRoleComponent
  ],
  providers: [
    createBsDatepickerConfigProvider()
  ]
})
export class RoleManagementModule { }

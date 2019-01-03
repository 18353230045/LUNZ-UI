import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeModule } from 'primeng/tree';

import { SharedModule } from '../shared/shared.module';
import { RoleManagementRoutingModule } from './role-management-routing.module';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { RolesComponent } from './partial/roles/roles.component';
import { EditRoleComponent } from './partial/edit-role/edit-role.component';
import { RoleMenusComponent } from './partial/role-menus/role-menus.component';
import { RoleUsersComponent } from './partial/role-users/role-users.component';
import { CreateRoleComponent } from './partial/create-role/create-role.component';
import { UsersListComponent } from './partial/role-users/users-list/users-list.component';
import { AddRoleUsersComponent } from './partial/add-role-users/add-role-users.component';
import { InstitutionsComponent } from './partial/role-users/institutions/institutions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    SharedModule,
    RoleManagementRoutingModule
  ],
  declarations: [
    RolesComponent,
    EditRoleComponent,
    RoleMenusComponent,
    RoleUsersComponent,
    UsersListComponent,
    CreateRoleComponent,
    AddRoleUsersComponent,
    InstitutionsComponent
  ],
  entryComponents: [
    CreateRoleComponent,
    AddRoleUsersComponent
  ],
  providers: [
    createBsDatepickerConfigProvider()
  ]
})
export class RoleManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RoleManagementRoutingModule } from './role-management-routing.module';

import { RolesComponent } from './partial/roles/roles.component';
import { CreateRoleComponent } from './partial/create-role/create-role.component';
import { EditRoleComponent } from './partial/edit-role/edit-role.component';
import { RoleMenusComponent } from './partial/role-menus/role-menus.component';
import { RoleUsersComponent } from './partial/role-users/role-users.component';
import { UsersListComponent } from './partial/role-users/users-list/users-list.component';
import { InstitutionsComponent } from './partial/role-users/institutions/institutions.component';

import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RoleManagementRoutingModule
  ],
  declarations: [
    RolesComponent,
    CreateRoleComponent,
    EditRoleComponent,
    RoleMenusComponent,
    RoleUsersComponent,
    UsersListComponent,
    InstitutionsComponent
  ],
  entryComponents: [
    CreateRoleComponent
  ],
  providers: [
    createBsDatepickerConfigProvider()
  ]
})
export class RoleManagementModule { }

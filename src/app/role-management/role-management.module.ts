import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeModule } from 'primeng/tree';

import { SharedModule } from '../shared/shared.module';
import { RoleManagementRoutingModule } from './role-management-routing.module';

import { RolesComponent } from './partial/roles/roles.component';
import { RoleMenusComponent } from './partial/role-menus/role-menus.component';
import { RoleUsersComponent } from './partial/role-users/role-users.component';
import { CreateRoleComponent } from './partial/create-role/create-role.component';
import { AddRoleUsersComponent } from './partial/add-role-users/add-role-users.component';

@NgModule({
  imports: [
    TreeModule,
    FormsModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RoleManagementRoutingModule
  ],
  declarations: [
    RolesComponent,
    RoleMenusComponent,
    RoleUsersComponent,
    CreateRoleComponent,
    AddRoleUsersComponent
  ],
  entryComponents: [
    CreateRoleComponent,
    AddRoleUsersComponent
  ],
  providers: []
})
export class RoleManagementModule { }

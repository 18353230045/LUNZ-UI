import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { RolesComponent } from './partial/roles/roles.component';
import { RoleMenusComponent } from './partial/role-menus/role-menus.component';
import { RoleUsersComponent } from './partial/role-users/role-users.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'roles', component: RolesComponent, data: { title: '角色列表' } },
    [
      { path: 'menus/:id', component: RoleMenusComponent, data: { title: '角色菜单' } },
      { path: 'users/:id', component: RoleUsersComponent, data: { title: '角色用户' } },
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class RoleManagementRoutingModule { }

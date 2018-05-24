import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { HearFromsComponent } from './partial/hear-froms/hear-froms.component';
import { EditHearFromComponent } from './partial/edit-hear-from/edit-hear-from.component';
import { CreateHearFromComponent } from './partial/create-hear-from/create-hear-from.component';

const routes: Routes =
  RouteExtensions.withHost(
      { path: 'hearFroms', component: HearFromsComponent, data: { title: '从哪里听说' } },
      [
        { path: 'new', component: CreateHearFromComponent, data: { title: '新建' } },
        { path: ':id/edit', component: EditHearFromComponent, data: { title: '编辑' } }
      ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HearFromRoutingModule { }

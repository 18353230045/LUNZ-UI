import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxBootstrapComponent } from './ngx-bootstrap.component';

const routes: Routes = [
  { path: 'ngx-bootstrap', component: NgxBootstrapComponent, data: { title: 'ngx-bootstrap' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NgxBootstrapRoutingModule { }


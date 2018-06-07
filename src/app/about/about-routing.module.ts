import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';

import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', component: AboutComponent, data: { title: '关于' + environment.appName } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AboutRoutingModule { }

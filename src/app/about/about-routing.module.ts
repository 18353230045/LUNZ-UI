import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '@env/environment';

import { AboutComponent } from './about.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: AboutComponent, data: { title: extract('关于' + environment.appName) } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AboutRoutingModule { }

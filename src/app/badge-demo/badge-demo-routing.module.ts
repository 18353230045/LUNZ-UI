import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { BadgeDemoComponent } from './partial/badge-demo/badge-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'badge', component: BadgeDemoComponent, data: { title: 'badge标记' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'badge标记使用文档' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class BadgeDemoRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { CollapseDemoComponent } from './partial/collapse-demo/collapse-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'collapse', component: CollapseDemoComponent, data: { title: 'collapse折叠面板' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'collapse折叠面板使用文档' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CollapseDemoRoutingModule { }

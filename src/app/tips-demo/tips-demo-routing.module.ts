import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { TipsComponent } from './partial/tips-demo/tips.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'tips', component: TipsComponent, data: { title: 'tips提示' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'tips提示使用文档' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class TipsDemoRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { CounterComponent } from './partial/counter-demo/counter.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'counter', component: CounterComponent, data: { title: '计数器' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '计数器使用文档' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CounterDemoRoutingModule { }

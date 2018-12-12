import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { Select2Component } from './partial/select2/select2.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'select2', component: Select2Component, data: { title: 'select2选择器' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'select2选择器' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class Select2DemoRoutingModule { }

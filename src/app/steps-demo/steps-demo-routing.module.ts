import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { StepsDemoComponent } from './partial/steps-demo/steps-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'steps', component: StepsDemoComponent, data: { title: 'steps步骤条' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'steps步骤条使用文档' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StepsDemoRoutingModule { }

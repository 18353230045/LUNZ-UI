import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@core/route.service';

import { TagComponent } from './partial/tag-demo/tag.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
  RouteExtensions.withHost(
    { path: 'tag', component: TagComponent, data: { title: 'tag标签' } },
    [
      { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'tag标签使用文档' } }
    ]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class TagDemoRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { TabsDemoComponent } from './partial/tabs-demo/tabs-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'tabs', component: TabsDemoComponent, data: { title: 'tabs组件' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'tabs组件使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class TabsDemoRoutingModule { };

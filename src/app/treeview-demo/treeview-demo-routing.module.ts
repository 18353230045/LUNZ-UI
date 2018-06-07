import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { TreeviewDemoComponent } from './partial/treeview-demo/treeview-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: TreeviewDemoComponent, data: { title: '树结构' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '树结构使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class TreeviewDemoRoutingModule { }

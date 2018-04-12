import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { SelectDemoComponent } from './partial/select-demo/select-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'selected', component: SelectDemoComponent, data: { title: 'select选择器' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'select选择器使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class SelectSelectionrRoutingModule { }

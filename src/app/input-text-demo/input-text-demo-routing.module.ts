import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { InputTextDemoComponent } from './partial/input-text-demo/input-text-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'text&password', component: InputTextDemoComponent, data: { title: 'text&password组件' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'text&password组件使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class InputTextDemoRoutingModule { }

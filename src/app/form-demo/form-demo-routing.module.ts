import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { FormDemoComponent } from './partial/form-demo/form-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: FormDemoComponent, data: { title: 'form表单' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'form表单使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class FormDemoRoutingModule { }

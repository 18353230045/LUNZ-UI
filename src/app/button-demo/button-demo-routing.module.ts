import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { ButtonDemoComponent } from './partial/button-demo/button-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'button', component: ButtonDemoComponent, data: { title: '按钮' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '按钮使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class ButtonDemoRoutingModule { }

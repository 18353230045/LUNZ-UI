import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { SwitchDemoComponent } from './partial/switch-demo/switch-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'switch', component: SwitchDemoComponent, data: { title: 'switch组件' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'switch组件使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class SwitchDemoRoutingModule { };

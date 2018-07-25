import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { RateDemoComponent } from './partial/rate-demo/rate-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'rate', component: RateDemoComponent, data: { title: 'rate评分' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'rate评分使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class RateDemoRoutingModule { }

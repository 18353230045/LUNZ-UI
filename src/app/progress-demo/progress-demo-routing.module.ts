import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { ProgressDemoComponent } from './partial/progress-demo/progress-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: ProgressDemoComponent, data: { title: '进度条' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '进度条使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class ProgressDemoRoutingModule { }

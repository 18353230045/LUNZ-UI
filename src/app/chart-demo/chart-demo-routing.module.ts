import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { ChartComponent } from './partial/chart/chart.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: ChartComponent, data: { title: '图表' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '图表使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class ChartDemoRoutingModule { }

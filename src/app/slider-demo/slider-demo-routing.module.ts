import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { SliderComponent } from './partial/slider-demo/slider.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'slider', component: SliderComponent, data: { title: 'slider滑块' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'slider滑块使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class SliderDemoRoutingModule { }

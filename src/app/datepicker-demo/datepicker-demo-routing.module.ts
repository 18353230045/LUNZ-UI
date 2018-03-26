import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { DatepickerComponent } from './partial/datepicker/datepicker.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'datepicker', component: DatepickerComponent, data: { title: '时间选择器' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '时间选择器使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class DatepickerDemoRoutingModule { };

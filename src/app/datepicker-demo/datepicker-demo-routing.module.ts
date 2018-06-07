import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { DatepickerSelectComponent } from './partial/datepicker-select/datepicker-select.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: DatepickerSelectComponent, data: { title: '时间选择器' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '时间选择器使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class DatepickerDemoRoutingModule { };

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { DropdownComponent } from './partial/dropdown/dropdown.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: DropdownComponent, data: { title: '下拉选择器' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '下拉选择器使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class DropdownRoutingModule { }

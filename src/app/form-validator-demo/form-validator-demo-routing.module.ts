import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { FormValidatorComponent } from './partial/form-validator/form-validator.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: '', component: FormValidatorComponent, data: { title: '表单验证器' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '表单验证器使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class FormValidatorRoutingModule { }

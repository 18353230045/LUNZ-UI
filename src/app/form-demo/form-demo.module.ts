import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormDemoRoutingModule } from './form-demo-routing.module';

import { FormDemoComponent } from './partial/form-demo/form-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormDemoRoutingModule
    ],

    declarations: [
        FormDemoComponent,
        UsingDocumentsComponent
    ]
})

export class FormDemoModule { }

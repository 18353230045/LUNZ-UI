import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Select2Module } from 'ng2-select2';

import { SharedModule } from '../shared/shared.module';
import { Select2DemoRoutingModule } from './select2-demo-routing.module';

import { Select2Component } from './partial/select2/select2.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        Select2Module,
        SharedModule,
        Select2DemoRoutingModule
    ],

    declarations: [
        Select2Component,
        UsingDocumentsComponent
    ]
})
export class Select2DemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { InputTextDemoRoutingModule } from './input-text-demo-routing.module';

import { InputTextDemoComponent } from './partial/input-text-demo/input-text-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        InputTextDemoRoutingModule
    ],

    declarations: [
        InputTextDemoComponent,
        UsingDocumentsComponent
    ]
})

export class InputTextDemoModule { };

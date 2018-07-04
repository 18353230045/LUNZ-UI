import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ZrValidationMessageModule } from 'zr-validation-message';

import { SharedModule } from '../shared/shared.module';

import { FormValidatorRoutingModule } from './form-validator-demo-routing.module';
import { FormValidatorComponent } from './partial/form-validator/form-validator.component';

import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        ZrValidationMessageModule.forRoot(),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormValidatorRoutingModule
    ],

    declarations: [
        FormValidatorComponent,
        UsingDocumentsComponent
    ]
})

export class FormValidatorDemoModule { };

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ZrValidationMessageModule } from 'zr-validation-message';
import { ZrDatepickerModule } from 'zr-datepicker';

import { SharedModule } from '../shared/shared.module';
import { FormDemoRoutingModule } from './form-demo-routing.module';

import { FormDemoComponent } from './partial/form-demo/form-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ZrValidationMessageModule,
    ZrDatepickerModule,
    SharedModule,
    FormDemoRoutingModule
  ],

  declarations: [
    FormDemoComponent,
    UsingDocumentsComponent,
  ]
})

export class FormDemoModule { }

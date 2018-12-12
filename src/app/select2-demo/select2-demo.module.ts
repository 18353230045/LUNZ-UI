import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'ng-select';
import { MultiSelectModule } from 'primeng/multiselect';

import { SharedModule } from '../shared/shared.module';
import { Select2DemoRoutingModule } from './select2-demo-routing.module';

import { Select2Service } from './shared/select2.service';

import { Select2Component } from './partial/select2/select2.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectModule,
    SelectModule,
    SharedModule,
    Select2DemoRoutingModule
  ],

  declarations: [
    Select2Component,
    UsingDocumentsComponent
  ],

  providers: [Select2Service]
})

export class Select2DemoModule { }

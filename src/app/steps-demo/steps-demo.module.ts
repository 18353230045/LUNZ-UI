import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElChildModules } from 'element-angular';
import { ZrButtonModule } from 'zr-button';

import { SharedModule } from '../shared/shared.module';
import { StepsDemoRoutingModule } from './steps-demo-routing.module';

import { StepsDemoComponent } from './partial/steps-demo/steps-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ZrButtonModule,
    ElChildModules.ElStepsModule,
    StepsDemoRoutingModule
  ],

  declarations: [
    StepsDemoComponent,
    UsingDocumentsComponent
  ]
})

export class StepsDemoModule { }

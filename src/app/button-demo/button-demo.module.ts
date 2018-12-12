import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrButtonModule } from 'zr-button';

import { SharedModule } from '../shared/shared.module';
import { ButtonDemoRoutingModule } from './button-demo-routing.module';

import { ButtonDemoComponent } from './partial/button-demo/button-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonDemoRoutingModule,
    ZrButtonModule
  ],
  declarations: [
    ButtonDemoComponent,
    UsingDocumentsComponent
  ]
})

export class ButtonDemoModule { }

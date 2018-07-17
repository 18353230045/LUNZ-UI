import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrAngularModule } from 'zr-angular';

import { SharedModule } from '../shared/shared.module';
import { SwitchDemoRoutingModule } from './switch-demo-routing.module';

import { SwitchDemoComponent } from './partial/switch-demo/switch-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SwitchDemoRoutingModule,
    ZrAngularModule.forRoot()
  ],

  declarations: [
    SwitchDemoComponent,
    UsingDocumentsComponent
  ]
})

export class SwitchDemoModule { }

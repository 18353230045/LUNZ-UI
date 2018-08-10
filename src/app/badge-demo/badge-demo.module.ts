import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ElChildModules } from 'element-angular';
import { ZrButtonModule } from 'zr-button';
import { SharedModule } from '../shared/shared.module';
import { BadgeDemoRoutingModule } from './badge-demo-routing.module';

import { BadgeDemoComponent } from './partial/badge-demo/badge-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ZrButtonModule,
    ElChildModules.ElBadgesModule,
    BadgeDemoRoutingModule
  ],

  declarations: [
    BadgeDemoComponent,
    UsingDocumentsComponent
  ]
})

export class BadgeDemoModule { }

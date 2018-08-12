import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElChildModules } from 'element-angular';
import { SharedModule } from '../shared/shared.module';
import { CardDemoRoutingModule } from './card-demo-routing.module';

import { CardDemoComponent } from './partial/card-demo/card-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ElChildModules.ElCollapseModule,
    CardDemoRoutingModule
  ],

  declarations: [
    CardDemoComponent,
    UsingDocumentsComponent
  ]
})

export class CardDemoModule { }

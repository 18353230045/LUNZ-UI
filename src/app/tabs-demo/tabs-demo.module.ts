import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TabsDemoRoutingModule } from './tabs-demo-routing.module';

import { TabsDemoComponent } from './partial/tabs-demo/tabs-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsDemoRoutingModule
  ],

  declarations: [
    TabsDemoComponent,
    UsingDocumentsComponent
  ]
})

export class TabsDemoModule { }

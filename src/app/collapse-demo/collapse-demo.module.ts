import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/accordion';

import { SharedModule } from '../shared/shared.module';
import { CollapseDemoRoutingModule } from './collapse-demo-routing.module';

import { CollapseDemoComponent } from './partial/collapse-demo/collapse-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccordionModule,
    CollapseDemoRoutingModule
  ],
  declarations: [
    CollapseDemoComponent,
    UsingDocumentsComponent
  ]
})
export class CollapseDemoModule { }

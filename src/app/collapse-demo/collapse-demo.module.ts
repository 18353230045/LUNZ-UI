import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../shared/shared.module';
import { CollapseDemoRoutingModule } from './collapse-demo-routing.module';

import { CollapseDemoComponent } from './partial/collapse-demo/collapse-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    CollapseDemoRoutingModule
  ],
  declarations: [
    CollapseDemoComponent,
    UsingDocumentsComponent
  ]
})
export class CollapseDemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../shared/shared.module';
import { TipsDemoRoutingModule } from './tips-demo-routing.module';

import { TipsComponent } from './partial/tips-demo/tips.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    TipsDemoRoutingModule
  ],
  declarations: [
    TipsComponent,
    UsingDocumentsComponent
  ]
})
export class TipsDemoModule { }

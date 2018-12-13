import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../shared/shared.module';
import { RateDemoRoutingModule } from './rate-demo-routing.module';

import { RateDemoComponent } from './partial/rate-demo/rate-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgZorroAntdModule,
    RateDemoRoutingModule
  ],

  declarations: [
    RateDemoComponent,
    UsingDocumentsComponent,
  ]
})

export class RateDemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZrCounterModule } from 'zr-counter';

import { SharedModule } from '../shared/shared.module';
import { CounterDemoRoutingModule } from './counter-demo-routing.module';

import { CounterComponent } from './partial/counter-demo/counter.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ZrCounterModule,
    CounterDemoRoutingModule,
  ],
  declarations: [
    CounterComponent,
    UsingDocumentsComponent
  ]
})

export class CounterDemoModule { }

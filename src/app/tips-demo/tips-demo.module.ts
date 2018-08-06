import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrButtonModule } from 'zr-button';

import { SharedModule } from '../shared/shared.module';
import { TipsDemoRoutingModule } from './tips-demo-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { TipsComponent } from './partial/tips-demo/tips.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TipsDemoRoutingModule,
    TooltipModule.forRoot(),
    ZrButtonModule
  ],
  declarations: [
    TipsComponent,
    UsingDocumentsComponent
  ]
})
export class TipsDemoModule { }

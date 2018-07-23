import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrAngularModule } from 'zr-angular';

import { SharedModule } from '../shared/shared.module';
import { TipsDemoRoutingModule } from './tips-demo-routing.module';

import { TipsComponent } from './partial/tips-demo/tips.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TipsDemoRoutingModule,
    TooltipModule,
    ZrAngularModule.forRoot()
  ],
  declarations: [
    TipsComponent,
    UsingDocumentsComponent
  ]
})
export class TipsDemoModule { }

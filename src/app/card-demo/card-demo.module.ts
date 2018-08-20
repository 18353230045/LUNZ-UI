import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CardDemoRoutingModule } from './card-demo-routing.module';

import { CardComponent } from './partial/card-demo/card.component';
import { Card3Component } from './partial/card-3/card-3.component';
import { Card5Component } from './partial/card-5/card-5.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CardDemoRoutingModule,
  ],
  declarations: [
    CardComponent,
    Card3Component,
    Card5Component,
    UsingDocumentsComponent
  ]
})

export class CardDemoModule { }

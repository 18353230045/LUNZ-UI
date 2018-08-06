import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrTagModule } from 'zr-tag';

import { SharedModule } from '../shared/shared.module';
import { TagDemoRoutingModule } from './tag-demo-routing.module';

import { TagComponent } from './partial/tag-demo/tag.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ZrTagModule,
    TagDemoRoutingModule
  ],

  declarations: [
    TagComponent,
    UsingDocumentsComponent
  ]

})

export class TagDemoModule { }

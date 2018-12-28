import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TagDemoRoutingModule } from './tag-demo-routing.module';

import { TagComponent } from './partial/tag-demo/tag.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TagDemoRoutingModule
  ],

  declarations: [
    TagComponent,
    UsingDocumentsComponent
  ]

})

export class TagDemoModule { }

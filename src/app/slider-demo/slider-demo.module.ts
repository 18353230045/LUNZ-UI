import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SliderDemoRoutingModule } from './slider-demo-routing.module';

import { SliderComponent } from './partial/slider-demo/slider.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SliderDemoRoutingModule
  ],

  declarations: [
    SliderComponent,
    UsingDocumentsComponent
  ]

})

export class SliderDemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRatingModule } from 'ng2-bar-rating';

import { SharedModule } from '../shared/shared.module';
import { RateDemoRoutingModule } from './rate-demo-routing.module';

import { RateDemoComponent } from './partial/rate-demo/rate-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        BarRatingModule,
        SharedModule,
        RateDemoRoutingModule
    ],

    declarations: [
        RateDemoComponent,
        UsingDocumentsComponent,
    ]
})

export class RateDemoModule { }

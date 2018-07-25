import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrProgressModule } from 'zr-progress';

import { SharedModule } from '../shared/shared.module';
import { ProgressDemoRoutingModule } from './progress-demo-routing.module';

import { ProgressDemoComponent } from './partial/progress-demo/progress-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ZrProgressModule,
        ProgressDemoRoutingModule,
    ],

    declarations: [
        ProgressDemoComponent,
        UsingDocumentsComponent

    ]
})

export class ProgressDemoModule { };

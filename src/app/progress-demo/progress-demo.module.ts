import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElModule } from 'element-angular';

import { SharedModule } from '../shared/shared.module';
import { ProgressDemoRoutingModule } from './progress-demo-routing.module';

import { ProgressComponent } from './partial/progress/progress.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ProgressDemoRoutingModule,
        ElModule.forRoot()
    ],

    declarations: [
        ProgressComponent,
        UsingDocumentsComponent

    ]
})

export class ProgressDemoModule { };

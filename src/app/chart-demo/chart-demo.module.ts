import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ChartDemoRoutingModule } from './chart-demo-routing.module';

import { ChartComponent } from './partial/chart/chart.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ChartDemoRoutingModule
    ],
    declarations: [
        ChartComponent,
        UsingDocumentsComponent
    ],

    providers: [
    ]
})

export class ChartDemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrSelectSelectionModule } from 'zr-select-selection';

import { SharedModule } from '../shared/shared.module';
import { SelectSelectionrRoutingModule } from './select-selectionr-demo-routing.module';

import { SelectDemoComponent } from './partial/select-demo/select-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        ZrSelectSelectionModule,
        SharedModule,
        SelectSelectionrRoutingModule
    ],

    declarations: [
        SelectDemoComponent,
        UsingDocumentsComponent
    ]

})

export class SelectSelectionDemoModule { }

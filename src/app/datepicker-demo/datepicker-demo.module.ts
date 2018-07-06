import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DatepickerDemoRoutingModule } from './datepicker-demo-routing.module';

import { DatepickerSelectComponent } from './partial/datepicker-select/datepicker-select.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        DatepickerDemoRoutingModule
    ],

    declarations: [
        DatepickerSelectComponent,
        UsingDocumentsComponent
    ]
})

export class DatepickerDemoModule { };

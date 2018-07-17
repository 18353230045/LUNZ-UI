import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZrAngularModule } from 'zr-angular';

import { SharedModule } from '../shared/shared.module';
import { DropdownRoutingModule } from './dropdown-demo-routing.module';

import { DropdownComponent } from './partial/dropdown/dropdown.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        ZrAngularModule.forRoot(),
        SharedModule,
        DropdownRoutingModule
    ],

    declarations: [
        DropdownComponent,
        UsingDocumentsComponent
    ]
})

export class DropdownDemoModule { }

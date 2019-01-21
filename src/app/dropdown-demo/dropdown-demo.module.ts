import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { DropdownRoutingModule } from './dropdown-demo-routing.module';

import { DropdownComponent } from './partial/dropdown/dropdown.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    DropdownModule,
    DropdownRoutingModule
  ],
  declarations: [
    DropdownComponent,
    UsingDocumentsComponent
  ]
})
export class DropdownDemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { MomentModule } from 'angular2-moment/moment.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../shared/shared.module';

import { HearFromRoutingModule } from './hear-from-routing.module';

import { HearFromsService } from './shared/hear-froms.service';
import { HearFromsComponent } from './partial/hear-froms/hear-froms.component';
import { EditHearFromComponent } from './partial/edit-hear-from/edit-hear-from.component';
import { CreateHearFromComponent } from './partial/create-hear-from/create-hear-from.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxQueryModule,
    BsDatepickerModule,
    MomentModule,
    SharedModule,
    HearFromRoutingModule
  ],
  declarations: [
    HearFromsComponent,
    EditHearFromComponent,
    CreateHearFromComponent
  ],
  providers: [
    HearFromsService
  ]
})
export class HearFromModule { }

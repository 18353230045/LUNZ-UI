import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { MomentModule } from 'angular2-moment/moment.module';
import { DateFormatPipe } from 'angular2-moment';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDatatableFooterModule } from 'ngx-datatable-footer';
import { NgxQueryToolbarModule } from 'ngx-query-toolbar';
import { NgxDatatableActionsModule } from 'ngx-datatable-actions';
import { ZrValidationMessageModule } from 'zr-validation-message';

import { SharedModule } from '../shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';

import { OrdersService } from './shared/orders.service';
import { OrdersComponent } from './partial/orders/orders.component';
import { OrderComponent } from './partial/order/order.component';
import { CreateOrderComponent } from './partial/create-order/create-order.component';
import { EditOrderComponent } from './partial/edit-order/edit-order.component';
import { HearFromsService } from '../hear-from/shared/hear-froms.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxQueryModule,
    BsDatepickerModule,
    NgxDatatableFooterModule,
    NgxQueryToolbarModule,
    NgxDatatableActionsModule,
    ZrValidationMessageModule,
    MomentModule,
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    OrdersComponent,
    OrderComponent,
    CreateOrderComponent,
    EditOrderComponent
  ],
  providers: [
    OrdersService,
    HearFromsService,
    DateFormatPipe
  ]
})
export class OrderModule { }

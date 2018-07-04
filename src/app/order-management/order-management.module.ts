import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { MomentModule } from 'angular2-moment/moment.module';
import { NgxDatatableActionsModule } from 'ngx-datatable-actions';
import { ZrValidationMessageModule } from 'zr-validation-message';
import { NgxQueryToolbarModule } from 'ngx-query-toolbar';

import { SharedModule } from '../shared/shared.module';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { OrderManagementRoutingModule } from './order-management-routing.module';

import { OrdersService } from './shared/orders.service';

import { OrdersComponent } from './partial/orders/orders.component';
import { EditOrderComponent } from './partial/edit-order/edit-order.component';
import { CreateOrderComponent } from './partial/create-order/create-order.component';
import { OrderComponent } from './partial/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ZrValidationMessageModule.forRoot(),
    NgxQueryToolbarModule.forRoot(),
    NgxDatatableModule,
    NgxQueryModule,
    MomentModule,
    NgxDatatableActionsModule.forRoot(),
    SharedModule,
    OrderManagementRoutingModule
  ],
  declarations: [
    OrdersComponent,
    EditOrderComponent,
    CreateOrderComponent,
    OrderComponent
  ],
  providers: [
    OrdersService,
    createBsDatepickerConfigProvider()
  ]
})
export class OrderManagementModule { }

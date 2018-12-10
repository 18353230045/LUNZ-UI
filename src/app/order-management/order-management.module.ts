import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxQueryModule } from 'ngx-query';
import { MomentModule } from 'angular2-moment/moment.module';
import { NgxDatatableFooterModule } from 'ngx-datatable-footer';
// 简洁翻页组件时
// import { NgxDatatableFooterSimpleModule } from 'ngx-datatable-footer-simple';
import { NgxQueryToolbarModule } from 'ngx-query-toolbar';
import { NgxDatatableActionsModule } from 'ngx-datatable-actions';
import { ZrValidationMessageModule } from 'zr-validation-message';
import { ZrDatepickerModule } from 'zr-datepicker';

import { SharedModule } from '../shared/shared.module';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { OrderManagementRoutingModule } from './order-management-routing.module';

import { OrdersComponent } from './partial/orders/orders.component';
import { EditOrderComponent } from './partial/edit-order/edit-order.component';
import { EditOrderModalComponent } from './partial/edit-order-modal/edit-order-modal.component';
import { CreateOrderComponent } from './partial/create-order/create-order.component';
import { OrderComponent } from './partial/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxDatatableFooterModule,
    // 简洁翻页组件时
    // NgxDatatableFooterSimpleModule,
    NgxQueryToolbarModule,
    NgxDatatableActionsModule,
    ZrValidationMessageModule,
    ZrDatepickerModule,
    NgxDatatableModule,
    NgxQueryModule,
    MomentModule,
    SharedModule,
    OrderManagementRoutingModule
  ],
  declarations: [
    OrdersComponent,
    EditOrderComponent,
    CreateOrderComponent,
    EditOrderModalComponent,
    OrderComponent
  ],
  entryComponents: [EditOrderModalComponent],
  providers: [createBsDatepickerConfigProvider()]
})
export class OrderManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { OrdersComponent } from './partial/orders/orders.component';
import { EditOrderComponent } from './partial/edit-order/edit-order.component';
import { EditOrderModalComponent } from './partial/edit-order-modal/edit-order-modal.component';
import { CreateOrderComponent } from './partial/create-order/create-order.component';
import { OrderComponent } from './partial/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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

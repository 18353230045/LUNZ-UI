import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentModule } from 'ngx-moment';

import { SharedModule } from '../shared/shared.module';
import { WebMessageRoutingModule } from './web-message-routing.module';
import { MessageService } from '../messages/shared/message.service';

import { WebMessageComponent } from './web-message/web-message.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    SharedModule,
    WebMessageRoutingModule
  ],
  declarations: [
    WebMessageComponent
  ],
  providers: [MessageService]
})
export class WebMessageModule { }

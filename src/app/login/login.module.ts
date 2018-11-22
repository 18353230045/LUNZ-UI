import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }

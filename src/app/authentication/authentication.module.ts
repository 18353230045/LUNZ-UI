import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInCallbackComponent } from './sign-in-callback/sign-in-callback.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  declarations: [SignInCallbackComponent]
})
export class AuthenticationModule { }

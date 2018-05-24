import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';

import { RouteExtensions } from '../core/route.service';
import { SignInCallbackComponent } from './sign-in-callback/sign-in-callback.component';

const routes: Routes = [
  { path: 'authentication/callback', component: SignInCallbackComponent, data: { title: '认证' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthenticationRoutingModule { }

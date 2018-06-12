import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AuthenticationOAuth2Service } from '../../core/authentication/authentication-oauth2.service';

@Component({
  selector: 'app-sign-in-callback',
  templateUrl: './sign-in-callback.component.html',
  styleUrls: ['./sign-in-callback.component.scss']
})

export class SignInCallbackComponent implements OnInit {
  loading: boolean;
  success: boolean;

  constructor(
    private authenticationOAuth2Service: AuthenticationOAuth2Service,
    private router: Router,
    private injector: Injector) {
    this.loading = true;
  };

  ngOnInit() {

    setTimeout(() => {
      this.authenticationOAuth2Service.signinCallback().then(() => {
        this.loading = false;
        this.success = true;
      }).then(() => {
        const claims: any = this.authenticationOAuth2Service.claims;
        const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
        const currentRouting: string = sessionStorage.getItem('currentRouting');

        if (environment.authentication.useServiceV1 && claims.authToken &&
          (!authenticationService.isAuthenticated() ||
            authenticationService.credentials.token !== claims.authToken)) {
          authenticationService.loginByAuthToken(claims.authToken)
            .subscribe(() => {
              if (currentRouting !== null) {
                this.router.navigateByUrl(`/${currentRouting}`);
              } else {
                this.router.navigateByUrl(`/dashboard`);
              }
            });
        } else {
          if (currentRouting !== null) {
            this.router.navigateByUrl(`/${currentRouting}`);
          } else {
            this.router.navigateByUrl(`/dashboard`);
          }
        }

        if (!environment.authentication.useServiceV1) {
          if (currentRouting !== null) {
            this.router.navigateByUrl(`/${currentRouting}`);
          } else {
            this.router.navigateByUrl(`/dashboard`);
          }
        }

      }).catch(error => {
        this.loading = false;
        this.success = false;
      });
    }, 1000);
  };
};

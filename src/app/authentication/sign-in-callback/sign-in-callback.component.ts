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
        setTimeout(() => {
          const claims: any = this.authenticationOAuth2Service.claims;
          const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);

          if (environment.authentication.useServiceV1 && claims.authToken &&
            (!authenticationService.isAuthenticated() ||
              authenticationService.credentials.token !== claims.authToken)) {
            authenticationService.loginByAuthToken(claims.authToken)
              .subscribe(() => {
                this.router.navigateByUrl('/');
              });
          } else {
            this.router.navigateByUrl('/');
          }
        }, 1500);

        if (!environment.authentication.useServiceV1) {
          this.router.navigateByUrl('/');
        }

      }).catch(error => {
        this.loading = false;
        this.success = false;
      });
    }, 2000);
  };
};

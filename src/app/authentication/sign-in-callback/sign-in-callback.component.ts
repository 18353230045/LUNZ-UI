import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { timer } from 'rxjs';
import { environment } from '@env/environment';
import { AuthenticationService, AuthenticationOAuth2Service } from '@app/core';

@Component({
  selector: 'app-sign-in-callback',
  templateUrl: './sign-in-callback.component.html',
  styleUrls: ['./sign-in-callback.component.scss']
})
export class SignInCallbackComponent implements OnInit {
  loading: boolean;
  success: boolean;

  constructor(
    private router: Router,
    private injector: Injector,
    private authenticationOAuth2Service: AuthenticationOAuth2Service) {
    this.loading = true;
  }

  ngOnInit() {

    timer(1000).subscribe(() => {
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
              if (currentRouting !== null && currentRouting !== '/login') {
                this.router.navigateByUrl(`/${currentRouting}`);
              } else {
                this.router.navigateByUrl(`/dashboard`);
              }
            });
        } else {
          if (currentRouting !== null && currentRouting !== '/login') {
            this.router.navigateByUrl(`/${currentRouting}`);
          } else {
            this.router.navigateByUrl(`/dashboard`);
          }
        }

        if (!environment.authentication.useServiceV1) {
          if (currentRouting !== null && currentRouting !== '/login') {
            this.router.navigateByUrl(`/${currentRouting}`);
          } else {
            this.router.navigateByUrl(`/dashboard`);
          }
        }

      }).catch(() => {
        this.loading = false;
        this.success = false;
      });
    });
  }
}

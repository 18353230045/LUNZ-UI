import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { AuthenticationService, Credentials } from '@core/authentication/authentication.service';

declare const URI: any;

@Component({
  selector: 'app-sso-check',
  templateUrl: './sso-check.component.html',
  styleUrls: ['./sso-check.component.scss']
})
export class SsoCheckComponent implements OnInit {
  log: Logger;

  constructor(
    private router: Router,
    private injector: Injector,
    private loggerFactory: LoggerFactory,
    private authenticationService: AuthenticationService) {
    this.log = this.loggerFactory.getLogger();
  }

  ngOnInit() {
    if (!this.authenticationService.isUsing()) {
      return;
    }

    const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
    const credentials: Credentials = authenticationService.isAuthenticated() ? authenticationService.credentials : null;
    const token: string = credentials == null ? null : credentials.token;

    let returnUrl = '/';
    const uri = new URI(window.location.href);
    const queryString = uri.query();

    if (queryString && queryString !== null && queryString !== '') {
      const query = URI.parseQuery(queryString.toLowerCase());

      if (query.returnurl && query.returnurl !== null && query.returnurl !== '') {
        returnUrl = query.returnurl;
      }

      if (query.authtoken && query.authtoken !== null && query.authtoken !== '') {
        sessionStorage.setItem('SingleWebSiteLogin', 'Yes');

        if (token) {
          this.loginByAuthToken(returnUrl, query.authtoken);
        } else {
          this.router.navigate(['/login']);
        }

      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private loginByAuthToken(returnUrl: string, authToken: string) {
    this.authenticationService.loginByAuthToken(authToken)
      .subscribe(() => {
        this.router.navigate([returnUrl]);
      }, () => this.router.navigate(['/login']));
  }
}

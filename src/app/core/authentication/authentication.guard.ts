import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../logger.service';
import { LoggerFactory } from '../logger-factory.service';
import { AuthenticationService } from './authentication.service';
import { SsoServiceService } from '../../sso/shared/sso-service.service';
import { AuthenticationOAuth2Service } from "../authentication/authentication-oauth2.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  log: Logger;

  constructor(private router: Router,
    private loggerFactory: LoggerFactory,
    private authenticationService: AuthenticationService,
    private ssoServiceService: SsoServiceService,
    private authenticationOAuth2Service: AuthenticationOAuth2Service) {
    this.log = this.loggerFactory.getLogger('AuthenticationGuard');
  }

  canActivate(): boolean {
    // Using UserCenter
    if (this.authenticationService.isUsing()) {
      return this.checkByUserCenter();
    }
    // Using OAuth2
    if (this.authenticationOAuth2Service.isUsing()) {
      return this.checkByOAuth2();
    }
  }

  private checkByUserCenter(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }
    if (this.ssoServiceService.canLogin) {
      this.log.debug('Not authenticated, redirecting...');

      const returnUrl: string = window.location.pathname;
      let url = '/login';
      if (returnUrl && returnUrl !== '/' && returnUrl !== '/dashboard') {
        url += '?ReturnUrl=' + encodeURI(returnUrl);
      }
      this.router.navigateByUrl(url);

      return false;
    } else {
      window.location.href = this.ssoServiceService.ssoCheckUrl;
      return false;
    }
  }

  private checkByOAuth2(): boolean {
    if (this.authenticationOAuth2Service.isAuthenticated()) {
      return true;
    }

    this.authenticationOAuth2Service.signin();
    return false;
  }
}

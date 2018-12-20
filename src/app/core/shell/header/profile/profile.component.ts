import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { AuthenticationOAuth2Service } from '@core/authentication/authentication-oauth2.service';
import { ProfileService, Profile } from '@core/profile/profile.service';
import { CreateSubscriptionService } from '@app/shared';

import {
  ChangePasswordModalComponent
} from '../../../../change-password/change-password-modal/change-password-modal.component';

declare const $: any;

@Component({
  selector: 'app-profile, [app-profile]',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [BsModalService]
})
export class ProfileComponent implements OnInit {
  log: Logger;
  processing = true;
  isAuthenticated: boolean;
  profile: Profile = { displayName: '', username: '' };

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private loggerFactory: LoggerFactory,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private authenticationOAuth2Service: AuthenticationOAuth2Service,
    private createSubscriptionService: CreateSubscriptionService) {
    this.log = this.loggerFactory.getLogger('Profile');
  }

  ngOnInit() {

    if (this.authenticationService.isUsing()) {
      this.isAuthenticated = this.authenticationService.isAuthenticated();
    }

    if (this.authenticationOAuth2Service.isUsing()) {
      this.isAuthenticated = this.authenticationOAuth2Service.isAuthenticated();
    }

    if (this.isAuthenticated) {
      this.getProfile();
    }

    this.createSubscriptionService.currentData.subscribe(currentData => {
      if (currentData !== '') this.logout();
    });

  }

  logout() {
    // if usercenter authentication
    if (this.authenticationService.isUsing()) {

      this.authenticationService.logout().pipe(finalize(() => {
        this.checkoutMenuActive().then(() => {
          window.location.reload();
          this.router.navigate(['/login']);
        });
      })).subscribe(() => { });
    }

    // if micro service authentication
    if (this.authenticationOAuth2Service.isUsing()) {

      if (environment.authentication.useServiceV1) {
        this.authenticationService.logout().pipe(finalize(() => {
          window.location.reload();
          this.router.navigate(['/login']);
        })).subscribe(() => { });
      }

      this.authenticationOAuth2Service.signout();
    }
  }

  checkoutMenuActive() {
    return new Promise((resolve) => {
      const menuOpen = $('.m-brand__toggler--active');
      sessionStorage.setItem('logout', 'logout');
      sessionStorage.removeItem('currentRouting');
      if (menuOpen.length > 0) {
        $('#m_aside_left_minimize_toggle').trigger('click');
      }
      resolve();
    });
  }

  changePassword() {
    const modalRef = this.modalService.show(ChangePasswordModalComponent, { backdrop: 'static' });
  }

  viewMessages() {
    this.router.navigateByUrl('/messages/all');
  }

  private getProfile(): void {
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
    }, error => {
      this.log.error(error);
    });
  }
}

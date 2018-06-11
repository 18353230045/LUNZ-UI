import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap';

import { environment } from '../../../../../environments/environment';
import { Logger } from '../../../logger.service';
import { LoggerFactory } from '../../../logger-factory.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { AuthenticationOAuth2Service } from '../../../authentication/authentication-oauth2.service';
import { ProfileService, Profile } from '../../../profile/profile.service';
import {
  ChangePasswordModalComponent
} from '../../../../change-password/change-password-modal/change-password-modal.component';

declare const $: any;

@Component({
  selector: 'app-profile, [app-profile]',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  log: Logger;
  processing = true;
  isAuthenticated: boolean;
  profile: Profile = {
    displayName: '',
    username: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private authenticationOAuth2Service: AuthenticationOAuth2Service,
    private profileService: ProfileService,
    private loggerFactory: LoggerFactory,
    private router: Router,
    private modalService: BsModalService) {
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

  }

  logout() {
    const menuOpen = $('.m-brand__toggler--active');

    sessionStorage.setItem('logout', 'logout');

    if (menuOpen.length > 0) {
      $('#m_aside_left_minimize_toggle').trigger('click');
    }

    if (this.authenticationService.isUsing()) {
      this.authenticationService
        .logout()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }

    if (this.authenticationOAuth2Service.isUsing()) {

      if (environment.authentication.useServiceV1) {
        this.authenticationService
          .logout()
          .subscribe(() => { });
      }

      this.authenticationOAuth2Service
        .signout()
        .then(() => {
          this.router.navigate(['/']);
        });
    }
  };

  changePassword() {
    const modalRef = this.modalService.show(ChangePasswordModalComponent, { backdrop: 'static' });
  };

  viewMessages() {
    this.router.navigateByUrl('/messages/all');
  };

  private getProfile(): void {
    this.profileService.getProfile()
      .subscribe(profile => {
        this.profile = profile;
      }, error => {
        this.log.error(error);
      });
  };
};

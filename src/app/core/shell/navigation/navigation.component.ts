import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { ProfileService } from '@core/profile/profile.service';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { AuthenticationOAuth2Service } from '@core/authentication/authentication-oauth2.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [AuthenticationService, ProfileService]
})
export class NavigationComponent implements OnInit {
  log: Logger;
  isAuthenticated: boolean;
  menuItems: any = [];

  constructor(
    private router: Router,
    private loggerFactory: LoggerFactory,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private authenticationOAuth2Service: AuthenticationOAuth2Service) {
    this.log = this.loggerFactory.getLogger('Navigation');
  }

  ngOnInit() {
    if (this.authenticationService.isUsing()) {
      this.isAuthenticated = this.authenticationService.isAuthenticated();
    }

    if (this.authenticationOAuth2Service.isUsing()) {
      this.isAuthenticated = this.authenticationOAuth2Service.isAuthenticated();
    }

    if (this.isAuthenticated) {
      this.getMenus();
    }
  }

  isActive(url: string): boolean {
    if (url) {
      return this.router.isActive(url, true);
    }
  }

  private getMenus(): void {
    this.profileService.getMenus().subscribe((menuItems: any) => {
      this.menuItems = menuItems;
      localStorage.setItem('moduleTree', JSON.stringify(menuItems));
    }, error => this.log.error(error));
  }
}

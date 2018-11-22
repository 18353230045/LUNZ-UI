import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../logger.service';
import { LoggerFactory } from '../../logger-factory.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthenticationOAuth2Service } from '../../authentication/authentication-oauth2.service';
import { ProfileService } from '../../profile/profile.service';

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
        private authenticationService: AuthenticationService,
        private authenticationOAuth2Service: AuthenticationOAuth2Service,
        private profileService: ProfileService,
        private loggerFactory: LoggerFactory) {
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
            this.getMenuItems();
        }
    }

    isActive(url: string): boolean {
        if (url) {
            return this.router.isActive(url, true);
        }
    }

    private getMenuItems(): void {
        this.profileService.getMenuItems()
            .subscribe((menuItems: any) => {
                this.menuItems = menuItems;
                localStorage.setItem('moduleTree', JSON.stringify(menuItems));
            }, (error: any) => {
                this.log.error(error);
            });
    }
}

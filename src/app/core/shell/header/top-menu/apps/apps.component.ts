import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../../../environments/environment';
import { Logger } from '../../../../../core/logger.service';
// import { LoggerFactory } from '../../../../../core/logger-factory.service';
import { AuthenticationService } from '../../../../../core/authentication/authentication.service';
// import { AuthenticationOAuth2Service } from '../../../../../core/authentication/authentication-oauth2.service';
// import { ProfileService } from '../../../../profile/profile.service';

@Component({
    selector: 'app-top-menu-apps, [app-top-menu-apps]',
    templateUrl: './apps.component.html',
    styleUrls: ['./apps.component.scss']
})

export class AppsComponent implements OnInit {
    log: Logger;
    categories: Array<any> = [];
    get width(): any {
        return this.categories.length < 2 ? 'auto' : this.categories.length * 250;
    }

    constructor(
        private authenticationService: AuthenticationService,
        // private authenticationOAuth2Service: AuthenticationOAuth2Service,
        // private profileService: ProfileService,
        // private loggerFactory: LoggerFactory
    ) {

        // this.log = this.loggerFactory.getLogger();

    }

    ngOnInit() {
        // let isAuthenticated: boolean;

        // if (this.authenticationService.isUsing()) {
        //     isAuthenticated = this.authenticationService.isAuthenticated();
        // }

        // if (this.authenticationOAuth2Service.isUsing()) {
        //     isAuthenticated = this.authenticationOAuth2Service.isAuthenticated();
        // }

        // if (isAuthenticated) {
        //     this.getApps();
        // }
    }

    hasIcon(url: string): boolean {
        return (url && url !== '');
    }

    getIconUrl(url: string): string {
        return this.hasIcon(url) ? url.replace('~/', environment.api.userCenter.authUri) : url;
    }

    // private getApps() {
    //     this.profileService.getApps()
    //         .subscribe(categories => {
    //             this.categories = categories;
    //             this.log.debug(categories);
    //         }, error => {
    //             this.log.error(error);
    //         });
    // }
}

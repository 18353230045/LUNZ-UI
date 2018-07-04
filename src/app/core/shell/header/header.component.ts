import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';

import { environment } from '../../../../environments/environment';

declare const mLayout: any;
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  height: string;
  topMenuHeight: string;
  menuHidden = true;
  showTabs: Boolean = true;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService) { }

  ngOnInit() {

    $('body').on('click', '#m_aside_left_minimize_toggle', function () {
      if (!sessionStorage.getItem('logout')) {
        $('.la-refresh').trigger('click');
      };
    });

    this.showTabs = environment.haveTabs;
    this.setHeaderHeight();

    $(window).resize(() => {
      this.setHeaderHeight();
    });

  };

  ngAfterViewInit() {
    mLayout.initHeader();
  };

  setHeaderHeight() {
    const haveTabs = environment.haveTabs;
    const winWidth = window.innerWidth;

    if (haveTabs) {
      if (winWidth >= 993) {
        this.height = 'm-headerq';
        this.topMenuHeight = 'top-menu-height';
        this.showTabs = true;
      } else {
        this.height = '';
        this.topMenuHeight = '';
        this.showTabs = false;
      }
    };
  };

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login']));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

}

import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { I18nService } from '@app/core/i18n.service';
import { environment } from '@env/environment';

declare const $: any;
declare const mLayout: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  height: string;
  topMenuHeight: string;
  menuHidden = true;
  showTabs: Boolean = environment.haveTabs;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService) { }

  ngOnInit() {
    $('#m_aside_left_minimize_toggle').click(() => {
      if (!sessionStorage.getItem('logout')) {
        $('.la-refresh').trigger('click');
      }
    });
    this.setHeaderHeight();

    $(window).resize(() => {
      this.setHeaderHeight();
    });

  }

  ngAfterViewInit() {
    mLayout.initHeader();
  }

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
    }
  }

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

  ngOnDestroy() {
    $('#m_aside_left_minimize_toggle').unbind('click');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, LoggerFactory } from '@app/core';

@Component({
  selector: 'app-root, body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  log: Logger;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private loggerFactory: LoggerFactory,
    private translateService: TranslateService,
    private i18nService: I18nService) {
    this.log = this.loggerFactory.getLogger('App');
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    // Change page title on navigation or language change, based on route data
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }), filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)).subscribe(event => {
          const title = event['title'];
          if (title) {
            this.titleService.setTitle(this.translateService.instant(title));
          }
        });
  }
}

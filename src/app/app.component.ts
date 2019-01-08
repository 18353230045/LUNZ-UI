import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { environment } from '@env/environment';
import { CreateSubscriptionService } from '@app/shared';
import { Logger, I18nService, LoggerFactory } from '@app/core';

@Component({
  selector: 'app-root, body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  log: Logger;
  idleShow: boolean = false;
  idleWatch: boolean = false;
  countdown: number;
  freeTime: number = environment.freeTime;
  onIdleEnd: any;
  onTimeout: any;
  onTimeoutWarning: any;

  constructor(
    private idle: Idle,
    private router: Router,
    private titleService: Title,
    private i18nService: I18nService,
    private loggerFactory: LoggerFactory,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private createSubscriptionService: CreateSubscriptionService) {
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
    const routerEvent = this.router.events;
    const onNavigationEnd = routerEvent.pipe(filter(event => event instanceof NavigationEnd));

    merge(this.translateService.onLangChange, onNavigationEnd).pipe(map(() => {
      let route = this.activatedRoute;
      while (route.firstChild) { route = route.firstChild; }
      return route;
    }), filter(route => route.outlet === 'primary'), mergeMap(route => route.data)).subscribe(event => {
      const title = event['title'];
      if (title) { this.titleService.setTitle(this.translateService.instant(title)); }
    });

    if (environment.idle) {
      routerEvent.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
        if (event['urlAfterRedirects'] !== '/login') {
          if (!this.idleWatch) this.setIdleMonitor();
        } else {
          if (this.idleWatch) {
            this.idleWatch = false;
            this.onIdleEnd.unsubscribe();
            this.onTimeout.unsubscribe();
            this.onTimeoutWarning.unsubscribe();
          }
        }
      });
    }

  }

  setIdleMonitor() {
    this.idleWatch = true;
    // Set idle time.
    this.idle.setIdle(environment.freeTime * 60);

    // Set the countdown long.
    this.idle.setTimeout(environment.countdownTime);

    // Set the interrupt mode.
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // After the countdown starts, the callback after touching the computer.
    this.onIdleEnd = this.idle.onIdleEnd.subscribe(() => {
      this.idleShow = false;
    });

    // Callback after timeout.
    this.onTimeout = this.idle.onTimeout.subscribe(() => {
      this.idleShow = false;
      this.idleWatch = false;
      this.createSubscriptionService.publishSubscribeIdle('idle');
    });


    // When the countdown is in progress.
    this.onTimeoutWarning = this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.idleShow = true;
      this.countdown = countdown;
    });

    // Start idle monitor》
    this.idle.watch();
  }
}

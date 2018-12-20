import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, LoggerFactory } from '@app/core';
import { CreateSubscriptionService } from '@app/shared';

@Component({
  selector: 'app-root, body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  log: Logger;
  idleShow: boolean = false;
  idleWatch: boolean = false;
  onIdleEnd: any;
  onTimeout: any;
  onIdleStart: any;
  onTimeoutWarning: any;
  freeTime: number = environment.freeTime;
  countdown: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private idle: Idle,
    private titleService: Title,
    private loggerFactory: LoggerFactory,
    private translateService: TranslateService,
    private createSubscriptionService: CreateSubscriptionService,
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
            this.onIdleStart.unsubscribe();
            this.onTimeoutWarning.unsubscribe();
          }
        }
      });
    }

  }

  setIdleMonitor() {
    this.idleWatch = true;
    // 设置空闲时间
    this.idle.setIdle(environment.freeTime);

    // 设置倒计时时长时间
    this.idle.setTimeout(environment.countdownTime);

    // 设置中断倒计时方式（单击、滚动、对文档的操作）
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // 倒计时开始了，触动电脑后回调
    this.onIdleEnd = this.idle.onIdleEnd.subscribe(() => {
      this.idleShow = false;
    });

    // 超时后的回调
    this.onTimeout = this.idle.onTimeout.subscribe(() => {
      this.idleShow = false;
      this.idleWatch = false;
      this.createSubscriptionService.publishSubscribeIdle('idle');
    });


    // 正在倒计时的回调
    this.onTimeoutWarning = this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.idleShow = true;
      this.countdown = countdown;
    });

    // 启动空闲监控
    this.idle.watch();
  }
}

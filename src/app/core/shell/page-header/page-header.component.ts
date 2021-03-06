import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Observable, merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  title: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService) {
    // this.init();
  }

  ngOnInit() {

  }

  private init() {

    // Change page title on navigation or language change, based on route data
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }), filter(route => route.outlet === 'primary'), mergeMap(route => route.data)).subscribe(event => {
        const title = event['title'];
        if (title) {
          this.title = this.translateService.instant(title);
        }
      });
  }
}

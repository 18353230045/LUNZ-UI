import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

import { filter } from 'rxjs/operators';

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.init();
  }

  ngOnInit() { }

  private init() {

    // Subscribe to the NavigationEnd event.
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // Set breadcrumbs.
      const root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
      // A page that jumps to a refresh at a refresh.
      if (this.breadcrumbs.length > 0) {
        const lastOne = this.breadcrumbs.length - 1;
        const currentRouting = this.breadcrumbs[lastOne].url;
        sessionStorage.setItem('currentRouting', currentRouting);
      }
    });

  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb.
   *
   * @class DetailComponent
   * @method getBreadcrumbs
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';
    const ROUTE_DATA_IS_BREADCRUMB = 'breadcrumb';

    // Get the child routes.
    const children: ActivatedRoute[] = route.children;

    // Return if there are no more children.
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Iterate over each children.
    for (const child of children) {
      // Verify primary route
      if (child.outlet !== 'primary') {
        continue;
      }

      // Verify the custom data property 'breadcrumb' is specified on the route.
      if (child.snapshot.data.hasOwnProperty(ROUTE_DATA_IS_BREADCRUMB)) {
        if (!child.snapshot.data[ROUTE_DATA_IS_BREADCRUMB]) {
          return this.getBreadcrumbs(child, url, breadcrumbs);
        }
      }

      // Verify the custom data property 'breadcrumb' is specified on the route.
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // Get the route's URL segment.
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // Append route URL to URL.
      url += `/${routeURL}`;

      // Add breadcrumb.
      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      // Recursive.
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}



import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { environment } from '../../../environments/environment';

declare const jQuery: any;
declare const mApp: any;
declare const mUtil: any;
declare const mLayout: any;

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  paddingTop: string;
  showBreadcrumbs: boolean = true;

  constructor(private router: Router) { }


  ngOnInit() {

    this.showBreadcrumbs = !environment.haveTabs;

    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        jQuery('.m-wrapper>.progress').show();
        (<any>mLayout).closeMobileAsideMenuOffcanvas();
        (<any>mLayout).closeMobileHorMenuOffcanvas();
        (<any>mApp).scrollTop();
        // Helpers.setLoading(true);
        // hide visible popover
        // (<any>$('[data-toggle="m-popover"]')).popover('hide');
      }
      if (route instanceof NavigationEnd) {
        // init required js
        jQuery('.m-wrapper>.progress').hide();
        (<any>mApp).init();
        (<any>mUtil).init();
        // Helpers.setLoading(false);
        // content m-wrapper animation
        const animation = 'm-animate-fade-in-up';
        jQuery('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          function (e: any) {
            jQuery('.m-wrapper').removeClass(animation);
          }).removeClass(animation).addClass(animation);
      }
    });

    this.setContentWarpPaddingTop();

    jQuery(window).resize(() => {
      this.setContentWarpPaddingTop();
    });

  };

  setContentWarpPaddingTop() {
    const haveTabs = environment.haveTabs;
    const winWidth = window.innerWidth;

    if (haveTabs) {
      if (winWidth >= 993) {
        this.paddingTop = 'lz-content-padding-top';
      } else {
        this.paddingTop = '';
      }
    };
  };
};

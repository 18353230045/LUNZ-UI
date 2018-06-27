import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit {
  tabs: any[] = [];
  tabActive: string;

  constructor(
    private router: Router
  ) {
    this.init();
  };

  ngOnInit() { };

  // is have
  isHave(activeUrl: string) {
    for (const tab of this.tabs) {
      if (activeUrl === tab.url) {
        this.tabActive = tab.name;
        return true;
      }
    };
  };

  // init
  init() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      const activeUrl = event['urlAfterRedirects'];
      const timer = setInterval(() => {
        const allModule = JSON.parse(localStorage.getItem('moduleTree'));
        if (allModule !== null) {
          clearInterval(timer);
          if (this.isHave(activeUrl)) {
            return;
          } else {
            for (const module of allModule) {
              if (module.children.length === 0) {
                if (module.ngUrl === activeUrl) {
                  this.tabs.push({ name: module.name, url: module.ngUrl, icon: module.icon });
                  this.tabActive = module.name;
                  this.isFill();
                  return;
                }
              } else {
                for (const childModule of module.children) {
                  if (childModule.ngUrl === activeUrl) {
                    this.tabs.push({ name: childModule.name, url: childModule.ngUrl, icon: childModule.icon });
                    this.tabActive = childModule.name;
                    this.isFill();
                    return;
                  }
                };
              };
            };
          };
        };
      }, 200);
    });
  };

  // remove tab
  removeTab(tab: any, index: number) {
    if (this.tabs.length === 1) {
      return;
    } else {
      if (tab.name === this.tabActive) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (tab.name === this.tabs[i].name && index !== 0) {
            this.router.navigate([`${this.tabs[i - 1].url}`]);
          };
        };
      };
      this.tabs.splice(index, 1);
    }
  };

  // active tab
  activeTab(tab: any) {
    this.tabActive = tab.name;
    this.router.navigate([`${tab.url}`]);
  };

  // Do you need to handle the need to move tab？
  isFill() {
    const tabsContiner = $('#lz-tabs-content').outerWidth();
    const tabContinerDom = $('#lz-tabs-continer-ul');
    const allTabDomOldLength = $('.lz-tabs-item').length;
    let allTabDomWidth = 0;
    let moveMarginLeft = 0;

    const timer = setInterval(() => {
      const allTabDomNew = $('.lz-tabs-item');
      const allTabDomNewLength = allTabDomNew.length;

      if (allTabDomOldLength + 1 === allTabDomNewLength) {
        clearInterval(timer);
        allTabDomNew.each(function (i: any) {
          const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
          allTabDomWidth += ($(this).outerWidth() + thisMarginRight);
          if (i === allTabDomNewLength - 1) {
            moveMarginLeft = $(this).outerWidth() + thisMarginRight;
          };
        });

        if (allTabDomWidth > tabsContiner) {
          let tabContinerDomMarginLeft = Number(tabContinerDom.css('margin-left').replace('px', ''));
          tabContinerDomMarginLeft -= (moveMarginLeft + 10);
          tabContinerDom.css('margin-left', tabContinerDomMarginLeft + 'px');
        };
      };
    }, 300);
  };

  // move tab
  moveTab(direction: string) {
    const tabContinerDom = $('#lz-tabs-continer-ul');
    const marginLeft = Number(tabContinerDom.css('margin-left').replace('px', ''));

    if (direction === 'left') { // to left
      const afterMarginRight = marginLeft - 150;
      tabContinerDom.animate({ 'margin-left': afterMarginRight + 'px' }, 500);
    } else if (direction === 'right') { // to right
      if (marginLeft === 0) {
        return;
      } else {
        const afterMarginLeft = marginLeft + 150;
        if (afterMarginLeft >= 0) {
          tabContinerDom.animate({ 'margin-left': '0px' }, 500);
        } else {
          tabContinerDom.animate({ 'margin-left': afterMarginLeft + 'px' }, 500);
        }
      }
    }
  };

  // show move icon
  showMoveIcon() {
    const tabCcontentDomWidth = $('#lz-tabs-content').outerWidth();
    let allTabWidth = 0;

    $('.lz-tabs-item').each(function () {
      const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
      allTabWidth += ($(this).outerWidth() + thisMarginRight);
    });

    if (allTabWidth > tabCcontentDomWidth) {
      return false;
    } else {
      return true;
    }
  };

  // disable left move icon
  disableLeftMoveIcon() {
    const tabCcontentDomWidth = $('#lz-tabs-content').outerWidth();
    const marginLeft = Number($('#lz-tabs-continer-ul').css('margin-left').replace('px', ''));
    let allTabWidth = 0;
    let minMoveMarginLeft = 0;
    $('.lz-tabs-item').each(function () {
      const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
      allTabWidth += ($(this).outerWidth() + thisMarginRight);
    });
    minMoveMarginLeft = tabCcontentDomWidth - allTabWidth;
    if (marginLeft <= minMoveMarginLeft) {
      return true;
    } else {
      return false;
    }
  };

  // disable right move icon
  disableRightMoveIcon() {
    const marginLeft = Number($('#lz-tabs-continer-ul').css('margin-left').replace('px', ''));
    if (marginLeft >= 0) {
      return true;
    } else {
      return false;
    }
  };

};

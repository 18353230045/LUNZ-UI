import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { timer, fromEvent, Subscription } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  tabs: any[] = [];
  tabActive: string;
  showMoveIcon: boolean = true;
  disableLeftMoveIcon: boolean = true;
  disableRightMoveIcon: boolean = true;
  windowResizeEvent$: Subscription;

  @ViewChild('continer') continer: ElementRef;

  constructor(private router: Router) {
    this.init();
  }

  ngOnInit() {
    this.windowResizeEvent$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        timer(500).subscribe(() => {
          const activeUrl = sessionStorage.getItem('activeUrl');
          this.movingTabToVisualArea(activeUrl)
            .then(() => this.isShowMoveTabIcon())
            .then(() => this.isDisableLeftMoveIcon())
            .then(() => this.isDisableRightMoveIcon());
        });
      });
  }

  // Is have
  isHave(activeUrl: string) {
    for (const tab of this.tabs) {
      if (activeUrl === tab.url) {
        this.tabActive = tab.name;
        return true;
      }
    }
  }

  // Init
  init() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const activeUrl = event['urlAfterRedirects'];
        sessionStorage.setItem('activeUrl', activeUrl);
        this.addTab(activeUrl)
          .then(() => this.isFill())
          .then(() => this.movingTabToVisualArea(activeUrl))
          .then(() => this.isShowMoveTabIcon())
          .then(() => this.isDisableLeftMoveIcon())
          .then(() => this.isDisableRightMoveIcon());
      });
  }

  // Add tab
  addTab(activeUrl: string) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const allModule = JSON.parse(localStorage.getItem('moduleTree'));
        if (allModule !== null) {
          clearInterval(interval);
          if (this.isHave(activeUrl)) {
            this.movingTabToVisualArea(activeUrl)
              .then(() => this.isShowMoveTabIcon())
              .then(() => this.isDisableLeftMoveIcon())
              .then(() => this.isDisableRightMoveIcon());
          } else {
            for (const module of allModule) {
              if (module.children.length === 0 && module.ngUrl === activeUrl) {
                this.tabs.push({ name: module.name, url: module.ngUrl, icon: module.icon });
                this.tabActive = module.name;
                resolve();
              } else {
                for (const childModule of module.children) {
                  if (childModule.ngUrl === activeUrl) {
                    this.tabs.push({ name: childModule.name, url: childModule.ngUrl, icon: childModule.icon });
                    this.tabActive = childModule.name;
                    resolve();
                  }
                }
              }
            }
          }
        }
      }, 50);
    });
  }

  // Remove tab encapsulation
  removeTabEncapsulation(tab: any, index: number) {
    return new Promise((resolve) => {
      if (this.tabs.length !== 1 && tab.name === this.tabActive) {
        if (index === 0) {
          this.router.navigate([`${this.tabs[index + 1].url}`]);
        } else {
          this.router.navigate([`${this.tabs[index - 1].url}`]);
        }
      }
      this.tabs.splice(index, 1);
      this.continer.nativeElement.style.marginLeft = '0px';
      resolve();
    });
  }

  // Remove tab
  removeTab(tab: any, index: number) {
    this.removeTabEncapsulation(tab, index)
      .then(() => this.isShowMoveTabIcon())
      .then(() => this.isDisableLeftMoveIcon())
      .then(() => this.isDisableRightMoveIcon());
  }

  // Active tab
  activeTab(tab: any) {
    this.tabActive = tab.name;
    this.router.navigate([`${tab.url}`]);
  }

  // Do you need to handle the need to move tab？
  isFill() {
    return new Promise((resolve) => {
      const tabsContiner = $('#lz-tabs-content').width();
      const tabContinerDom = $('#lz-tabs-continer-ul');
      let allTabDomWidth = 0;
      let moveMarginLeft = 0;

      this.isRenderingcompletion().then(() => {
        const allTabDomNew = $('.lz-tabs-item-lhg');

        allTabDomNew.each(function (i: any) {
          const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
          allTabDomWidth += ($(this).outerWidth() + thisMarginRight);
          if (i === allTabDomNew.length - 1) {
            moveMarginLeft = $(this).outerWidth() + thisMarginRight;
          }
        });

        if (allTabDomWidth > tabsContiner) {
          let tabContinerDomMarginLeft = Number(tabContinerDom.css('margin-left').replace('px', ''));
          tabContinerDomMarginLeft -= moveMarginLeft;
          tabContinerDom.css('margin-left', tabContinerDomMarginLeft + 'px');
        }
        resolve();
      });
    });
  }

  // Is rendering completion
  isRenderingcompletion() {
    return new Promise((resolve) => {
      const allTabDomOldLength = $('.lz-tabs-item-lhg').length;
      const interval = setInterval(() => {
        const allTabDomNew = $('.lz-tabs-item-lhg');
        const allTabDomNewLength = allTabDomNew.length;
        if ((allTabDomOldLength + 1 === allTabDomNewLength) || (allTabDomOldLength === allTabDomNewLength)) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  // Move tab encapsulation
  moveTabEncapsulation(direction: string) {
    return new Promise((resolve) => {
      const tabContinerDom = $('#lz-tabs-continer-ul');
      const tabCcontentDomWidth = $('#lz-tabs-content').outerWidth();
      const marginLeft = Number(tabContinerDom.css('margin-left').replace('px', ''));
      let allTabWidth = 0;
      let minMarginLeft = 0;

      $('.lz-tabs-item-lhg').each(function () {
        const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
        allTabWidth += ($(this).outerWidth() + thisMarginRight);
      });

      minMarginLeft = tabCcontentDomWidth - allTabWidth;

      if (direction === 'left') { // to left
        const afterMarginRight = marginLeft - 300;
        if (afterMarginRight <= minMarginLeft) {
          tabContinerDom.animate({ 'margin-left': `${minMarginLeft}px` }, 400, () => resolve());
        } else {
          tabContinerDom.animate({ 'margin-left': `${afterMarginRight}px` }, 400, () => resolve());
        }
      } else if (direction === 'right') { // to right
        const afterMarginLeft = marginLeft + 300;
        if (afterMarginLeft >= 0 || afterMarginLeft > -50) {
          tabContinerDom.animate({ 'margin-left': '0px' }, 400, () => resolve());
        } else {
          tabContinerDom.animate({ 'margin-left': afterMarginLeft + 'px' }, 400, () => resolve());
        }
      }
    });
  }

  // Move to tab
  moveTab(direction: string) {
    this.moveTabEncapsulation(direction)
      .then(() => this.isShowMoveTabIcon())
      .then(() => this.isDisableRightMoveIcon())
      .then(() => this.isDisableLeftMoveIcon());
  }

  // Show move icon
  isShowMoveTabIcon() {
    return new Promise((resolve) => {
      const tabCcontentDomWidth = $('#lz-tabs-content').outerWidth();
      let allTabWidth = 0;

      this.isRenderingcompletion().then(() => {
        $('.lz-tabs-item-lhg').each(function () {
          const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
          allTabWidth += ($(this).outerWidth() + thisMarginRight);
        });
        if (allTabWidth > tabCcontentDomWidth) {
          this.showMoveIcon = false;
        } else {
          this.showMoveIcon = true;
        }
      });
      resolve();
    });
  }

  // Is disable left move icon
  isDisableLeftMoveIcon() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const marginLeft = Number($('#lz-tabs-continer-ul').css('margin-left').replace('px', ''));
        if (marginLeft >= 0) {
          this.disableLeftMoveIcon = true;
        } else {
          this.disableLeftMoveIcon = false;
        }
        resolve();
      }, 400);
    });
  }

  // Is disable right move icon
  isDisableRightMoveIcon() {
    return new Promise((resolve) => {
      const tabCcontentDomWidth = $('#lz-tabs-content').outerWidth();
      const marginLeft = Number($('#lz-tabs-continer-ul').css('margin-left').replace('px', ''));
      let allTabWidth = 0;
      let minMoveMarginLeft = 0;

      this.isRenderingcompletion().then(() => {
        $('.lz-tabs-item-lhg').each(function () {
          const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
          allTabWidth += ($(this).outerWidth() + thisMarginRight);
        });
        minMoveMarginLeft = tabCcontentDomWidth - allTabWidth;
        if (Math.floor(marginLeft) <= Math.floor(minMoveMarginLeft) && marginLeft !== 0) {
          this.disableRightMoveIcon = true;
        } else {
          this.disableRightMoveIcon = false;
        }
        resolve();
      });
    });
  }

  // Moving the activated tab to the visual area
  movingTabToVisualArea(activeUrl: string) {
    return new Promise((resolve) => {
      const tabsContent = $('#lz-tabs-content').outerWidth();
      const tabscontiner = $('#lz-tabs-continer-ul');
      let allTabWidth = 0;

      $('.lz-tabs-item-lhg').each(function () {
        const thisMarginRight = Number($(this).css('margin-right').replace('px', ''));
        allTabWidth += ($(this).outerWidth() + thisMarginRight);
      });
      if (allTabWidth - tabsContent > 0) {
        this.tabs.forEach((item) => {
          if (item.url === activeUrl) {
            const index = this.tabs.indexOf(item);
            const occupationRatio = index / this.tabs.length;
            if (occupationRatio < 0.5) {
              tabscontiner.css('margin-left', '0px');
            } else {
              const minMarginLeft = tabsContent - allTabWidth;
              tabscontiner.css('margin-left', minMarginLeft + 'px');
            }
          }
        });
      }
      resolve();
    });
  }

  // Remove right tabs
  removeRightTabs() {
    const tabsArray: any[] = [];
    let activeIndex: number;
    let activeUrl: string;
    this.tabs.forEach((item, index) => {
      if (item.name !== this.tabActive && activeIndex === undefined) {
        tabsArray.push(item);
      } else if (item.name === this.tabActive) {
        activeIndex = index;
        activeUrl = item.url;
        tabsArray.push(item);
      }
    });
    this.tabs = tabsArray;
    $('#lz-tabs-continer-ul').css('margin-left', '0px');
    const interval = setInterval(() => {
      const marginLeft = $('#lz-tabs-continer-ul').css('margin-left');
      if (marginLeft === '0px') {
        clearInterval(interval);
        this.movingTabToVisualArea(activeUrl)
          .then(() => this.isShowMoveTabIcon())
          .then(() => this.isDisableLeftMoveIcon())
          .then(() => this.isDisableRightMoveIcon());
      }
    }, 50);
  }

  // Remove left tabs
  removeLeftTabs() {
    const tabsArray: any[] = [];
    let activeIndex: number;
    let activeUrl: string;
    this.tabs.forEach((item, index) => {
      if (item.name === this.tabActive && activeIndex === undefined) {
        tabsArray.push(item);
        activeIndex = index;
        activeUrl = item.url;
      } else if (index > activeIndex) {
        tabsArray.push(item);
      }
    });
    this.tabs = tabsArray;
    $('#lz-tabs-continer-ul').css('margin-left', '0px');
    const interval = setInterval(() => {
      const marginLeft = $('#lz-tabs-continer-ul').css('margin-left');
      if (marginLeft === '0px') {
        clearInterval(interval);
        this.movingTabToVisualArea(activeUrl)
          .then(() => this.isShowMoveTabIcon())
          .then(() => this.isDisableLeftMoveIcon())
          .then(() => this.isDisableRightMoveIcon());
      }
    }, 50);
  }

  // Remove all tabs
  removeAllTabs() {
    let activeItem: any;
    this.tabs.forEach((item) => {
      if (item.name === this.tabActive) activeItem = item;
    });
    this.tabs.length = 0;
    this.tabs.push(activeItem);

    $('#lz-tabs-continer-ul').css('margin-left', '0px');
    const interval = setInterval(() => {
      const modeDomLength = $('.lz-tabs-item-lhg').length;
      if (modeDomLength === 1 && $('#lz-tabs-continer-ul').css('margin-left') === '0px') {
        clearInterval(interval);
        this.isShowMoveTabIcon()
          .then(() => this.isDisableLeftMoveIcon())
          .then(() => this.isDisableRightMoveIcon());
      }
    }, 50);
  }

  ngOnDestroy() {
    this.windowResizeEvent$.unsubscribe();
  }
}

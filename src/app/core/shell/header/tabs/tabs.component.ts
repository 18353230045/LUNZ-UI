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
  showMoveIcon: Boolean = true;
  disableLeftMoveIcon: Boolean = true;
  disableRightMoveIcon: Boolean = true;

  constructor(
    private router: Router
  ) {
    this.init();
  };

  ngOnInit() {
    $(window).resize(() => {
      this.isFill().then(() => {
      }).then(() => {
        this.isShowMoveTabIcon();
      }).then(() => {
        this.isDisableLeftMoveIcon();
      }).then(() => {
        this.isDisableRightMoveIcon().then(() => {
          $('#lz-tabs-continer-ul').css('margin-left', '0px');
        });
      });
    });
  };

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
      this.addTab(activeUrl).then(() => {
        this.isFill();
      }).then(() => {
        this.isShowMoveTabIcon();
      }).then(() => {
        this.isDisableLeftMoveIcon();
      }).then(() => {
        this.isDisableRightMoveIcon();
      });
    });
  };

  // add tab
  addTab(activeUrl: string) {
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        const allModule = JSON.parse(localStorage.getItem('moduleTree'));
        if (allModule !== null) {
          clearInterval(timer);
          if (this.isHave(activeUrl)) {
            this.movingTabToVisualArea(activeUrl).then(() => {
              this.isShowMoveTabIcon();
            }).then(() => {
              this.isDisableLeftMoveIcon();
            }).then(() => {
              this.isDisableRightMoveIcon();
            });
          } else {
            for (const module of allModule) {
              if (module.children.length === 0) {
                if (module.ngUrl === activeUrl) {
                  this.tabs.push({ name: module.name, url: module.ngUrl, icon: module.icon });
                  this.tabActive = module.name;
                  resolve();
                }
              } else {
                for (const childModule of module.children) {
                  if (childModule.ngUrl === activeUrl) {
                    this.tabs.push({ name: childModule.name, url: childModule.ngUrl, icon: childModule.icon });
                    this.tabActive = childModule.name;
                    resolve();
                  }
                };
              };
            };
          };
        };
      }, 200);
    });
  };

  // remove tab encapsulation
  removeTabEncapsulation(tab: any, index: number) {
    return new Promise(() => {
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
    });
  };

  // remove tab
  removeTab(tab: any, index: number) {
    this.removeTabEncapsulation(tab, index).then(() => {
      this.isShowMoveTabIcon();
    }).then(() => {
      this.isDisableLeftMoveIcon();
    }).then(() => {
      this.isDisableRightMoveIcon();
    });
  };

  // active tab
  activeTab(tab: any) {
    this.tabActive = tab.name;
    this.router.navigate([`${tab.url}`]);
  };

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
          };
        });

        if (allTabDomWidth > tabsContiner) {
          let tabContinerDomMarginLeft = Number(tabContinerDom.css('margin-left').replace('px', ''));
          tabContinerDomMarginLeft -= moveMarginLeft;
          tabContinerDom.css('margin-left', tabContinerDomMarginLeft + 'px');
        };
        resolve();
      });
    });
  };

  // is rendering completion
  isRenderingcompletion() {
    return new Promise((resolve) => {
      const allTabDomOldLength = $('.lz-tabs-item-lhg').length;
      const timer = setInterval(() => {
        const allTabDomNew = $('.lz-tabs-item-lhg');
        const allTabDomNewLength = allTabDomNew.length;
        if ((allTabDomOldLength + 1 === allTabDomNewLength) || (allTabDomOldLength === allTabDomNewLength)) {
          clearInterval(timer);
          resolve();
        };
      }, 200);
    });
  };

  // move tab encapsulation
  moveTabEncapsulation(direction: string) {
    return new Promise((resolve) => {
      const tabContinerDom = $('#lz-tabs-continer-ul');
      const marginLeft = Number(tabContinerDom.css('margin-left').replace('px', ''));

      if (direction === 'left') { // to left
        const afterMarginRight = marginLeft - 300;
        tabContinerDom.animate({ 'margin-left': afterMarginRight + 'px' }, 500);
      } else if (direction === 'right') { // to right
        if (marginLeft !== 0) {
          const afterMarginLeft = marginLeft + 300;
          if (afterMarginLeft >= 0) {
            tabContinerDom.animate({ 'margin-left': '0px' }, 500);
          } else {
            tabContinerDom.animate({ 'margin-left': afterMarginLeft + 'px' }, 500);
          }
        }
      }
      resolve();
    });
  };

  // move to tab
  moveTab(direction: string) {
    this.moveTabEncapsulation(direction).then(() => {
      this.isShowMoveTabIcon();
    }).then(() => {
      this.isDisableLeftMoveIcon();
    }).then(() => {
      this.isDisableRightMoveIcon();
    });
  };

  // show move icon
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
  };

  // is disable left move icon
  isDisableLeftMoveIcon() {
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
        if (marginLeft <= minMoveMarginLeft) {
          this.disableLeftMoveIcon = true;
        } else {
          this.disableLeftMoveIcon = false;
        }
        resolve();
      });
    });
  };

  // is disable right move icon
  isDisableRightMoveIcon() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const marginLeft = Number($('#lz-tabs-continer-ul').css('margin-left').replace('px', ''));
        if (marginLeft >= 0) {
          this.disableRightMoveIcon = true;
        } else {
          this.disableRightMoveIcon = false;
        }
        resolve();
      }, 400);
    });
  };

  // moving the activated tab to the visual area
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
          };
        });
      };
      resolve();
    });
  };

};

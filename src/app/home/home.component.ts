import { Component, OnInit } from '@angular/core';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { ProfileService } from '@core/profile/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  log: Logger;
  menuLists: any[] = [];

  constructor(
    private loggerFactory: LoggerFactory,
    private profileService: ProfileService) {
    this.log = this.loggerFactory.getLogger(`Home`);
  }

  ngOnInit() {
    this.getMenus();
  }

  getMenus(): void {
    this.profileService.getMenus()
      .subscribe(menus => {
        this.menuLists = this.arrangementMenu(menus);
      }, () => this.log.error(`组件库数据获取失败！`));
  }

  arrangementMenu(menuList: any[]) {
    const menu: any[] = [];
    menuList.forEach((item: any) => {
      if (item.ngUrl !== undefined && item.children.length === 0) {
        menu.push({ name: item.name, icon: item.icon, url: item.ngUrl, });
      } else {
        item.children.forEach((itemt: any) => menu.push({ name: itemt.name, icon: itemt.icon, url: itemt.ngUrl, }));
      }
    });
    return menu;
  }
}

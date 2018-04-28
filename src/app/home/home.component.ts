import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../core/logger.service';
import { LoggerFactory } from '../core/logger-factory.service';

import { ProfileService } from '../core/profile/profile.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    log: Logger;
    menuLists: Array<any> = [];

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getMenuItems();
    };

    private getMenuItems(): void {
        this.profileService.getMenuItems()
            .subscribe(menuItems => {
                this.menuLists = this.arrangementMenu(menuItems);
            }, error => {
                this.log.error(`组件库数据获取失败！`);
            });
    };

    private arrangementMenu(menuList: Array<any>) {
        const menu: Array<any> = [];
        menuList.forEach((item: any) => {
            if (item.ngUrl !== undefined && item.children.length === 0) {
                menu.push({
                    name: item.name,
                    icon: item.icon,
                    url: item.ngUrl,
                });
            } else {
                item.children.forEach((itemt: any) => {
                    menu.push({
                        name: itemt.name,
                        icon: itemt.icon,
                        url: itemt.ngUrl,
                    });
                });
            }
        });

        return menu;
    };
};

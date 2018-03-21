import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class OperationService {
    recordClickMenu: Array<any> = [];

    constructor(
        private router: Router
    ) { };

    sortModelList(modeList: any) {
        modeList.sort((x: any, y: any) => {
            return y.clickNum - x.clickNum;
        });
        return modeList;
    };

    getModeList(modelName: string, moduelType: any) {
        const modeList = JSON.parse(localStorage.getItem(modelName)) || [];

        modeList.forEach((item: any) => {
            if (moduelType === 0) {
                item.name = `我的模块 ${item.name}`;
            } else {
                item.name = `历史访问 ${item.name}`;
            }
        });

        if (modeList !== null) {
            return this.sortModelList(modeList);
        }
    };

    fastEntryModule(row: any): void {
        const url = row.url || row.ngUrl;
        this.recordMenu(row);
        this.router.navigate([url]);
    };

    recordMenu(rew: any) {
        if (rew.url || rew.ngUrl) {
            const openHistoryList = localStorage.getItem(`openHistoryList`);
            if (openHistoryList == null) {
                this.recordClickMenu.push({
                    clickNum: 1,
                    name: rew.name.replace(/我的模块/g, '').replace(/历史访问/g, ''),
                    icon: rew.icon,
                    url: rew.url
                });

                localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
            } else {
                this.recordClickMenu = JSON.parse(openHistoryList);

                for (let i = 0; i < this.recordClickMenu.length; i++) {
                    if (this.recordClickMenu[i].name === rew.name.replace(/我的模块 /g, '').replace(/历史访问 /g, '')) {
                        this.recordClickMenu[i].clickNum += 1;

                        localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
                        this.recordClickMenu = [];
                        return;
                    }
                }

                this.recordClickMenu.push({
                    clickNum: 1,
                    name: rew.name.replace(/我的模块 /g, '').replace(/历史访问 /g, ''),
                    icon: rew.icon,
                    url: rew.url
                });

                localStorage.setItem(`openHistoryList`, JSON.stringify(this.recordClickMenu));
                this.recordClickMenu = [];
            }
        }
    };
};

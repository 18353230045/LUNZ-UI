import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ITreeOptions, IActionMapping } from 'angular-tree-component';
import { filter } from 'rxjs/operators';

declare const $: any;

// import { LoggerFactory } from '../../../../logger-factory.service';
// import { Logger } from '../../../../logger.service';

@Component({
    selector: 'app-top-menu-actions, [app-top-menu-actions]',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})

export class ActionsComponent implements OnInit {
    // log: Logger;

    myOperationMyModelList: Array<any> = [];
    myOperationOpenHistoryList: Array<any> = [];
    allModelList: Array<any> = [];
    temporaryList: Array<any> = [];
    recordClickMenu: Array<any> = [];
    nodes: Array<any> = [];
    userName: string;

    editModel: Boolean = false;
    addModel: Boolean = false;

    // 定义点击tree item事件
    actionMapping: IActionMapping = {
        mouse: {
            click: (tree, node) => this.handle(node)
        }
    };

    // 配置tree选项
    options: ITreeOptions = {
        actionMapping: this.actionMapping,
    };

    constructor(
        // private loggerFactory: LoggerFactory,
        private router: Router
    ) {
        // this.log = this.loggerFactory.getLogger(`我的操作`);

        // this.getProfileName().then(() => {
        //     this.init();
        // });

        // 取消tree组件内部打开子级菜单事件冒泡
        $('body').on('click', '.toggle-children-wrapper', function (event: any) {
            event.stopPropagation();
        });
    }

    ngOnInit() {
        // this.getProfileName().then(() => {
        //     this.getModeList(`${this.userName}-myOperationMyModelList`, 0).then((ModeList: any[]) => {
        //         this.myOperationMyModelList = ModeList || [];
        //     }).then(() => {
        //         this.getModeList(`${this.userName}-openHistoryList`, 1).then((Mode: any[]) => {
        //             this.myOperationOpenHistoryList = Mode || [];
        //         }).then(() => {
        //             this.removeRepeat(this.myOperationMyModelList, this.myOperationOpenHistoryList);
        //         });
        //     });
        // });

        $('.m-menu__submenu--left').on('click', '.lz-m-menu__link', function () {
            $(this).parents('.m-menu__item--rel').removeClass('m-menu__item--open-dropdown m-menu__item--hover');
        });
    }

    // getUserName
    getProfileName(): Promise<any> {
        return new Promise((resolve) => {
            const SHARED_SESSION_STORAGE_DATA = JSON.parse(localStorage.getItem('SHARED_SESSION_STORAGE_DATA'));
            const userName = JSON.parse(SHARED_SESSION_STORAGE_DATA.credentials).username;

            this.userName = userName;
            resolve();
        });
    }

    // init
    init() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
            const activeUrl = event['urlAfterRedirects'];
            const moduleTree = JSON.parse(localStorage.getItem('moduleTree'));
            const openHistoryList = localStorage.getItem(`${this.userName}-openHistoryList`);

            if (openHistoryList == null) {
                this.existence(activeUrl, moduleTree).then(() => {
                    localStorage.setItem(`${this.userName}-openHistoryList`, JSON.stringify(this.recordClickMenu));
                });
            } else {
                this.recordClickMenu = JSON.parse(openHistoryList);
                for (let i = 0; i < this.recordClickMenu.length; i++) {
                    if (this.recordClickMenu[i].url === activeUrl) {
                        this.recordClickMenu[i].clickNum += 1;
                        localStorage.setItem(`${this.userName}-openHistoryList`, JSON.stringify(this.recordClickMenu));
                        this.recordClickMenu = [];
                        return;
                    }
                }
                this.existence(activeUrl, moduleTree).then(() => {
                    localStorage.setItem(`${this.userName}-openHistoryList`, JSON.stringify(this.recordClickMenu));
                    this.recordClickMenu = [];
                });
            }
        });
    }

    // existence
    existence(activeUrl: any, moduleTree: any[]) {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (moduleTree !== null) {
                    clearInterval(timer);
                    for (const model of moduleTree) {
                        if (model.children.length === 0) {
                            if (activeUrl === model.ngUrl) {
                                this.recordClickMenu.push({
                                    clickNum: 1,
                                    name: model.name,
                                    icon: model.icon,
                                    url: model.ngUrl
                                });
                                resolve();
                            }
                        } else {
                            for (const mode of model.children) {
                                if (activeUrl === mode.ngUrl) {
                                    this.recordClickMenu.push({
                                        clickNum: 1,
                                        name: mode.name,
                                        icon: mode.icon,
                                        url: mode.ngUrl
                                    });
                                    resolve();
                                }
                            }
                        }
                    }
                }
            }, 200);
        });
    }

    // sort
    sortModelList(modeList: any) {
        return new Promise((resolve) => {
            modeList.sort((x: any, y: any) => {
                return y.clickNum - x.clickNum;
            });
            resolve(modeList);
        });
    }

    // get mode list
    getModeList(modelName: string, moduelType: any) {
        const modeList = JSON.parse(localStorage.getItem(modelName)) || [];

        if (modeList !== null) {
            return this.sortModelList(modeList);
        }
    }

    // remove repeat
    removeRepeat(arr1: Array<any>, arr2: Array<any>) {
        arr1.forEach((item: any) => {
            arr2.forEach((itemt, index) => {
                if (item.name === itemt.name) {
                    arr2.splice(index, 1);
                }
            });
        });
    }

    // move model
    moveModel(row: any, i: number, list: Array<any>, sortType: number, moveListName: string): void {
        if (sortType === 1) {
            list.forEach((item, index) => {
                if (i === index + 1) {
                    const preRowClickNum = item.clickNum;
                    const rowRowClickNum = row.clickNum;
                    row.clickNum = preRowClickNum;
                    item.clickNum = rowRowClickNum;
                }
            });
        } else if (sortType === -1) {
            list.forEach((item, index) => {
                if (i === index - 1) {
                    const nextRowClickNum = item.clickNum;
                    const rowRowClickNum = row.clickNum;
                    row.clickNum = nextRowClickNum;
                    item.clickNum = rowRowClickNum;
                }
            });
        }

        this.sortModelList(list).then((modlist: any) => {
            localStorage.setItem(`${this.userName}-${moveListName}`, JSON.stringify(modlist));
        }).then(() => {
            this.getModeList(`${this.userName}-myOperationMyModelList`, 0).then((modelList: any[]) => {
                this.myOperationMyModelList = modelList || [];
            });
        });
    }

    // delete model
    deleteModel(row: any, list: Array<any>, i: number, deleteListName: string): void {
        list.splice(i, 1);

        localStorage.setItem(`${this.userName}-${deleteListName}`, JSON.stringify(list));

        // this.log.success(`${row.name} 移除成功！`);
    }

    // delete model all
    deleteModelAll(): void {
        const count = this.myOperationOpenHistoryList.length;

        this.myOperationOpenHistoryList.splice(0, count);

        localStorage.setItem(`${this.userName}-openHistoryList`, JSON.stringify(this.myOperationOpenHistoryList));

        // this.log.success(`移除成功！`);
    }

    // get all model（assignment tree）
    getAllModel() {
        this.nodes.length = 0;
        let clickNum = 1;
        const allModel = JSON.parse(localStorage.getItem(`moduleTree`)) || [];

        allModel.forEach((item: any) => {
            clickNum += 1;
            item.clickNum = clickNum;
            this.myOperationMyModelList.forEach((itemt: any) => {
                if (item.name === itemt.name) {
                    item.checked = true;

                    if (item.children.length === 0) {
                        this.temporaryList.push(item);
                    }
                }
            });

            item.children.forEach((row: any) => {
                clickNum += 1;
                row.clickNum = clickNum;
                this.myOperationMyModelList.forEach((itemtt: any) => {
                    if (row.name === itemtt.name) {
                        row.checked = true;
                        item.checked = true;
                        this.temporaryList.push(row);
                    }
                });
            });
        });

        this.nodes = allModel;
        this.addModel = true;
    }

    // handle file
    handle(modelList: any) {
        if (modelList.data.children.length > 0) {
            return;
        }

        for (let i = 0; i < this.temporaryList.length; i++) {
            if (modelList.data.name === this.temporaryList[i].name) {
                this.temporaryList.splice(i, 1);
                modelList.data.checked = false;

                return;
            }

        }

        this.temporaryList.push({
            name: modelList.data.name,
            icon: modelList.data.icon,
            url: modelList.data.ngUrl,
            clickNum: modelList.data.clickNum,
            checked: true
        });

        modelList.data.checked = true;
    }

    // submit model
    submitCheckedModel(): void {
        if (this.temporaryList.length === 0) {
            // this.log.warn(`至少选择 1 个模块！`);
            return;
        }

        if (this.temporaryList.length > 5) {
            // this.log.warn(`最多添加5个模块！`);
            return;
        }

        localStorage.setItem(`${this.userName}-myOperationMyModelList`, JSON.stringify(this.temporaryList));
        const myOperationMyModelList = JSON.parse(localStorage.getItem(`${this.userName}-myOperationMyModelList`));

        this.sortModelList(myOperationMyModelList).then((modelList: any[]) => {
            this.myOperationMyModelList = modelList || [];
        });

        this.temporaryList = [];
        this.addModel = false;
        this.removeRepeat(this.myOperationMyModelList, this.myOperationOpenHistoryList);

        // this.log.success(`操作成功！`);
    }

    cancelCheckedModel(): void {
        this.temporaryList = [];
        this.addModel = false;
    }
}

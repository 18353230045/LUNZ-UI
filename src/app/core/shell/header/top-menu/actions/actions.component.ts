import { Component, OnInit } from '@angular/core';

import { ITreeOptions, IActionMapping } from 'angular-tree-component';

import { LoggerFactory } from '../../../../logger-factory.service';
import { Logger } from '../../../../logger.service';
import { OperationService } from '../../quick-actions/shared/operation.service';

declare const $: any;

@Component({
    selector: 'app-top-menu-actions, [app-top-menu-actions]',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})

export class ActionsComponent implements OnInit {
    log: Logger;

    myOperationMyModelList: Array<any> = [];
    myOperationOpenHistoryList: Array<any> = [];
    allModelList: Array<any> = [];
    temporaryList: Array<any> = [];
    recordClickMenu: Array<any> = [];
    nodes: Array<any> = [];

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
        private loggerFactory: LoggerFactory,
        private operationService: OperationService,
    ) {
        this.log = this.loggerFactory.getLogger();

        // 取消tree组件内部打开子级菜单事件冒泡
        $('body').on('click', '.toggle-children-wrapper', function (event: any) {
            event.stopPropagation();
        });
    };

    ngOnInit() {
        this.myOperationMyModelList = this.operationService.getModeList(`myOperationMyModelList`, 0) || [];
        this.myOperationOpenHistoryList = this.operationService.getModeList(`openHistoryList`, 1) || [];

        this.removeRepeat(this.myOperationMyModelList, this.myOperationOpenHistoryList);

        $('.m-menu__submenu--left').on('click', '.lz-m-menu__link', function () {
            $(this).parents('.m-menu__item--rel').removeClass('m-menu__item--open-dropdown m-menu__item--hover');
        });
    };

    removeRepeat(arr1: Array<any>, arr2: Array<any>) {
        arr1.forEach((item: any) => {
            arr2.forEach((itemt, index) => {
                if (item.name === itemt.name) {
                    arr2.splice(index, 1);
                }
            });
        });
    };

    moveModel(row: any, i: any, list: Array<any>, sortType: number, moveListName: string): void {
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

        this.operationService.sortModelList(list);

        localStorage.setItem(`${moveListName}`, JSON.stringify(list));

        this.myOperationMyModelList = this.operationService.getModeList(`myOperationMyModelList`, 0) || [];
    };

    deleteModel(row: any, list: Array<any>, i: number, deleteListName: string): void {
        list.splice(i, 1);

        localStorage.setItem(`${deleteListName}`, JSON.stringify(list));

        this.log.info(`${row.name} 移除成功！`);
    };

    deleteModelAll(): void {
        const count = this.myOperationOpenHistoryList.length;

        this.myOperationOpenHistoryList.splice(0, count);

        localStorage.setItem(`openHistoryList`, JSON.stringify(this.myOperationOpenHistoryList));

        this.log.info(`移除成功！`);
    };


    // 获取本地所有模块（赋值tree）
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
                    };
                });
            });
        });

        this.nodes = allModel;
        this.addModel = true;
    };

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
    };

    submitCheckedModel(): void {
        if (this.temporaryList.length === 0) {
            this.log.warn(`至少选择 1 个模块！`);
            return;
        }

        if (this.temporaryList.length > 5) {
            this.log.warn(`最多添加5个模块！`);
            return;
        }

        localStorage.setItem(`myOperationMyModelList`, JSON.stringify(this.temporaryList));

        const myOperationMyModelList = JSON.parse(localStorage.getItem('myOperationMyModelList'));
        this.myOperationMyModelList = this.operationService.sortModelList(myOperationMyModelList);

        this.temporaryList = [];
        this.addModel = false;
        this.removeRepeat(this.myOperationMyModelList, this.myOperationOpenHistoryList);

        this.log.info(`操作成功！`);
    };

    cancelCheckedModel(): void {
        this.temporaryList = [];
        this.addModel = false;
    };
};

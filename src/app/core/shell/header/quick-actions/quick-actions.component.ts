import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerFactory } from '../../../logger-factory.service';
import { Logger } from '../../../logger.service';
import { OperationService } from './shared/operation.service';

@Component({
    selector: 'app-quick-actions, [app-quick-actions]',
    templateUrl: './quick-actions.component.html',
    styleUrls: ['./quick-actions.component.scss']
})

export class QuickActionsComponent implements OnInit {
    log: Logger;

    moduleList: Array<any> = [];
    allModelList: Array<any> = [];
    temporaryList: any;
    myModuleShow: Boolean = false;
    editModules: Boolean = false;

    constructor(
        private loggerFactory: LoggerFactory,
        private operationService: OperationService
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getModuleList();
    };

    getModuleList() {
        const modulelist = JSON.parse(localStorage.getItem('quickOperationMyModelList'));
        if (modulelist === null) {
            for (let i = 0; i < 4; i++) {
                const module = {
                    name: 'add module',
                    icon: 'la la-plus',
                    isEmpty: true,
                    isEdit: false,
                    isActive: false
                };

                this.moduleList.push(module);
            }
        } else {
            const count = modulelist.length;

            if (count < 4) {
                modulelist.forEach((item: any) => {
                    this.moduleList.push(item);
                });

                for (let i = 0; i < 4 - count; i++) {
                    const module = {
                        name: 'add module',
                        icon: 'la la-plus',
                        isEmpty: true,
                        isEdit: false,
                        isActive: false
                    };

                    this.moduleList.push(module);
                };
            } else {
                this.moduleList = modulelist;
            }
        }
    };

    editModuleOpen() {
        this.moduleList.forEach((item: any) => {
            if (!item.isEmpty) {
                item.name = 'edit module';
                item.icon = 'la la-plus';
            }

            item.isEdit = true;
        });

        this.editModules = true;
    };

    editModuleClose() {
        this.moduleList.forEach((item: any) => {
            if (!item.isEmpty) {
                item.name = item.sparName;
                item.icon = item.sparIcon;
            }

            item.isEdit = false;
        });

        this.editModules = false;
    };

    getAllModel() {
        // 获取本地所有模块
        this.allModelList = [];
        this.allModelList = JSON.parse(localStorage.getItem(`menuListAll`));
    };

    // 添加、编辑、快速进入模块
    operationModule(item: any) {
        if (item.isEmpty || this.editModules) {
            this.getAllModel();
            item.isActive = true;
            this.myModuleShow = true;
        } else {
            this.operationService.fastEntryModule(item);
        }
    };

    // 选择模块
    handle(event: any, row: any) {
        this.temporaryList = [
            {
                name: row.name,
                sparName: row.name,
                icon: row.icon,
                sparIcon: row.icon,
                url: row.url,
                isEmpty: false,
                isEdit: false,
                isActive: false
            }
        ];
    };

    // 保存模块
    submitCheckedModel(): void {
        const localModule = JSON.parse(localStorage.getItem('quickOperationMyModelList'));

        if (localModule === null) {
            // 存到本地
            localStorage.setItem(`quickOperationMyModelList`, JSON.stringify(this.temporaryList));
        } else {
            // 判断是否编辑，是，则修改本地存储，否则push到本地存储
            const isEdit = this.editOrAddModule(this.moduleList, localModule);
            if (isEdit) {
                localModule.forEach((item: any) => {
                    this.moduleList.forEach((itemt: any) => {
                        if (itemt.isActive) {
                            if (item.sparName === itemt.sparName) {
                                item.name = this.temporaryList[0].name;
                                item.sparName = this.temporaryList[0].sparName;
                                item.icon = this.temporaryList[0].icon;
                                item.sparIcon = this.temporaryList[0].sparIcon;
                                item.url = this.temporaryList[0].url;
                                item.isEmpty = this.temporaryList[0].isEmpty;
                                item.isEdit = this.temporaryList[0].isEdit;
                                item.isActive = this.temporaryList[0].isActive;
                            }
                        }
                    });
                });
            } else {
                localModule.push({
                    name: this.temporaryList[0].name,
                    sparName: this.temporaryList[0].sparName,
                    icon: this.temporaryList[0].icon,
                    sparIcon: this.temporaryList[0].sparIcon,
                    url: this.temporaryList[0].url,
                    isEmpty: this.temporaryList[0].isEmpty,
                    isEdit: this.temporaryList[0].isEdit,
                    isActive: this.temporaryList[0].isActive
                });
            }
            // 存到本地
            localStorage.setItem(`quickOperationMyModelList`, JSON.stringify(localModule));
        }
        // 更新视图
        this.updateLocalView();
    };

    // 判断是编辑还是添加
    editOrAddModule(arr1: Array<any>, arr2: Array<any>) {
        let result: boolean;

        arr1.forEach((item: any) => {
            if (item.isActive) {
                arr2.forEach((itemt: any) => {
                    if (item.sparName === itemt.sparName) {
                        result = true;
                    }
                });
            }
        });

        return result;
    };

    // 更新本地视图
    updateLocalView() {
        this.moduleList.forEach((item: any) => {
            if (item.isActive) {
                item.name = this.temporaryList[0].name;
                item.sparName = this.temporaryList[0].sparName;
                item.icon = this.temporaryList[0].icon;
                item.sparIcon = this.temporaryList[0].sparIcon;
                item.url = this.temporaryList[0].url;
                item.isEmpty = this.temporaryList[0].isEmpty;
                item.isEdit = this.temporaryList[0].isEdit;
                item.isActive = this.temporaryList[0].isActive;
            }
        });

        // 成功，关闭模块列表
        this.myModuleShow = false;
        this.log.info(`操作成功！`);
        this.temporaryList = [];
    };

    // 取消
    cancelAddModel(): void {
        this.temporaryList = null;
        this.myModuleShow = false;
        this.moduleList.forEach((item: any) => {
            item.isActive = false;
        });
    };
};



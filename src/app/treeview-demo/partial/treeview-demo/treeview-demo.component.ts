import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';

import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'app-treeview-demo',
    templateUrl: './treeview-demo.component.html',
    styleUrls: ['./treeview-demo.component.scss']
})

export class TreeviewDemoComponent implements OnInit {
    log: Logger;
    nodes: Array<any> = [];
    itemData: any;

    // 配置tree选项
    options: ITreeOptions = {
        allowDrag: true,  // 支持拖动位置
        getChildren: this.getChildrenList.bind(this),  // 异步加载子节点
        allowDrop: (element, { parent, index }) => { // 拖动选项
            return parent.hasChildren;
        },
        getNodeClone: (item: any) => ({  // 拖动克隆对象
            id: item.node.id,
            name: item.node.name
        })
    };

    constructor(
        private treeviewDemoService: TreeviewDemoService,
        private loggerFactory: LoggerFactory,
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getRootList(); // 获取一级节点
    };

    // 处理数据
    processingNodeData(item: any): any {
        const oneData = {
            name: item.text,
            id: item.id,
            hasChildren: item.children,
            isOpen: false
        };
        return oneData;
    };

    // 获取根列表
    getRootList() {
        const applicationId = '4f500000-4c4f-0200-6a51-08d4ccde1a4a';

        this.treeviewDemoService.getRootList(applicationId).subscribe(response => {
            const nodeData = [];

            for (const row of response) {
                const oneData = this.processingNodeData(row);
                nodeData.push(oneData);
            }

            this.nodes = nodeData;

        }, error => this.log.error('列表获取失败。', error));
    };

    // 获取子列表
    getChildrenList(node: any) {
        let newNodes: Array<any> = [];

        this.treeviewDemoService.getChildrenList(node.data.id).subscribe(response => {
            const nodeData = [];

            for (const row of response) {
                const oneData = this.processingNodeData(row);
                nodeData.push(oneData);
            }

            newNodes = nodeData;

        }, error => this.log.error('子列表获取失败。', error));

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(newNodes), 1500);
        });
    };

    // 拖动节点
    onMoveNode($event: any) {
        // this.treeviewDemoService.moveNode($event).subscribe(response => {
        //     this.log.info(`操作成功!`);
        // }, error => this.log.error('操作失败', error));
    };

    // 获取item项数据
    getItemData(event: any) {
        const cacheArr: Array<any> = [];
        this.itemData = JSON.stringify(event, (key: any, value: any) => {
            if (typeof value === 'object' && value !== null) {
                if (cacheArr.indexOf(value) !== -1) {
                    return;
                }
                cacheArr.push(value);
            }

            return value;
        });
    };
};

import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';

// import { TreeModel, NodeEvent } from 'ng2-tree';

@Component({
    selector: 'app-treeview-demo',
    templateUrl: './treeview-demo.component.html',
    styleUrls: ['./treeview-demo.component.scss']
})

export class TreeviewDemoComponent implements OnInit {
    log: Logger;
    nodes: any[] = [];

    // public tree: TreeModel = {
    //     value: 'Programming languages by programming paradigm',
    //     children: [
    //         {
    //             value: 'Object-oriented programming',
    //             children: [
    //                 { value: 'Java' },
    //                 { value: 'C++' },
    //                 { value: 'C#' }
    //             ]
    //         },
    //         {
    //             value: 'Prototype-based programming',
    //             children: [
    //                 { value: 'JavaScript' },
    //                 { value: 'CoffeeScript' },
    //                 { value: 'Lua' }
    //             ]
    //         }
    //     ]
    // };

    constructor(
        private treeviewDemoService: TreeviewDemoService,
        private loggerFactory: LoggerFactory,
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        // this.getRootList();
    };

    // 处理数据
    processingNodeData(itemData: any): any {
        const oneData = {
            id: itemData.id,
            name: itemData.text,
            hasChildren: itemData.children,
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
        let children: Array<any> = [];

        this.treeviewDemoService.getChildrenList(node.data.id).subscribe(response => {
            const nodeData = [];

            for (const row of response) {
                const oneData = this.processingNodeData(row);
                nodeData.push(oneData);
            }

            children = nodeData;

        }, error => this.log.error('子列表获取失败。', error));

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(children), 500);
        });
    };

    // 拖动节点
    onMoveNode($event: any) {
        this.treeviewDemoService.moveNode($event).subscribe(response => {
            this.log.info(`操作成功!`);
        }, error => this.log.error('操作失败', error));
    };

};

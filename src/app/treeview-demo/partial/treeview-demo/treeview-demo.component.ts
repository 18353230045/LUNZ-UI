import { Component, OnInit } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { TreeviewDemoService } from '../../shared/treeview-demo.service';

@Component({
    selector: 'app-treeview-demo',
    templateUrl: './treeview-demo.component.html',
    styleUrls: ['./treeview-demo.component.scss']
})

export class TreeviewDemoComponent implements OnInit {
    log: Logger;
    filesTree0: Array<any> = [];
    itemData: any;

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
            label: item.text,
            id: item.id,
            // expandedIcon: 'fa fa-folder-open',
            // collapsedIcon: 'fa fa-folder',
            icon: item.children ? 'fa fa-github-alt' : 'fa fa-github',
            leaf: item.children ? false : true
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
            this.filesTree0 = nodeData;
        }, error => this.log.error('列表获取失败。', error));
    };

    // 获取子列表
    getChildrenList(event: any) {
        if (event.node) {
            this.treeviewDemoService.getChildrenList(event.node.id).subscribe(nodes => {
                const nodeArr = [];
                for (const row of nodes) {
                    const oneData = this.processingNodeData(row);
                    nodeArr.push(oneData);
                };
                event.node.children = nodeArr;
            }, error => this.log.error('子列表获取失败。', error));
        }
    };

    nodeSelect(event: any) {
        console.log(event);
        this.log.info(`选择：${event.node.label}`);
    };

    nodeUnselect(event: any) {
        this.log.info(`取消选择：${event.node.label}`);
    };


    // 拖动节点
    onMoveNode($event: any) {
        // this.treeviewDemoService.moveNode($event).subscribe(response => {
        //     this.log.info(`操作成功!`);
        // }, error => this.log.error('操作失败', error));
    };

};

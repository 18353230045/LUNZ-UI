import { Component, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { EditNodeModalComponent } from '../edit-node-modal/edit-node-modal.component';
import { CreateNodeModalComponent } from '../create-node-modal/create-node-modal.component';

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
    selectedFile: any;
    items: any;

    constructor(
        private treeviewDemoService: TreeviewDemoService,
        private loggerFactory: LoggerFactory,
        private modalService: BsModalService
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getRootList(); // 获取一级节点

        this.items = [
            {
                label: '新增同级节点',
                icon: 'fa fa-link',
                command: (event: any) => this.addNode(this.selectedFile)
            },
            {
                label: '新增子级节点',
                icon: 'fa fa-chain-broken',
                command: (event: any) => this.addNode(this.selectedFile)
            },
            {
                label: '编辑节点',
                icon: 'fa fa-edit',
                command: (event: any) => this.editNode(this.selectedFile)
            },
            {
                label: '删除节点',
                icon: 'fa fa-remove',
                command: (event: any) => this.removeNode(this.selectedFile)
            }
        ];
    };
    // 添加节点
    addNode(row: any) {
        const modalRef: BsModalRef = this.modalService.show(CreateNodeModalComponent);
        modalRef.content.data['action'] = '创建';

        const onHidden = this.modalService.onHidden.subscribe((reason: string) => {
            this.log.debug('onHidden', reason);
            onHidden.unsubscribe();
        });

    };
    // 编辑节点
    editNode(row: any) {
        console.log(row);
        const modalRef: BsModalRef = this.modalService.show(CreateNodeModalComponent);
        modalRef.content.data = row;
        modalRef.content.data['action'] = '编辑';

        const onHidden = this.modalService.onHidden.subscribe((reason: string) => {
            this.log.debug('onHidden', reason);
            onHidden.unsubscribe();
        });

    };
    // 移除节点
    removeNode(selectedFile: any) {
        // 从selectedFile里面获取节点id，调用后端接口，删除
        const label = selectedFile.label;
        console.log(label);
        if (selectedFile.parent) {
            const index = selectedFile.parent.children.indexOf(selectedFile);
            selectedFile.parent.children.splice(index, 1);
        } else {
            const index = this.filesTree0.indexOf(selectedFile);
            this.filesTree0.splice(index, 1);
        };
        this.log.info(`删除节点：${label}`);
    };

    // 处理数据
    processingNodeData(item: any): any {
        return {
            label: item.text,
            id: item.id,
            icon: item.children ? 'fa fa-github-alt' : 'fa fa-github',
            leaf: item.children ? false : true
        };
    };

    // 获取一级
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

    // 获取子级
    getChildrenList(event: any) {
        if (event.node) {
            this.treeviewDemoService.getChildrenList(event.node.id).subscribe(nodes => {
                const nodeArr = [];
                for (const row of nodes) {
                    const oneData = this.processingNodeData(row);
                    nodeArr.push(oneData);
                };
                event.node.children = nodeArr;
            }, error => this.log.error('子级获取失败。', error));
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

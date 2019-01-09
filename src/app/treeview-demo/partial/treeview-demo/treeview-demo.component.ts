import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap';
import { LoggerFactory } from '@core/logger-factory.service';
import { Logger } from '@core/logger.service';
import { TreeNode } from 'primeng/api';

import { EditNodeModalComponent } from '../edit-node-modal/edit-node-modal.component';
import { CreateNodeModalComponent } from '../create-node-modal/create-node-modal.component';

import { TreeviewDemoService } from '../../shared/treeview-demo.service';

@Component({
  selector: 'app-treeview-demo',
  templateUrl: './treeview-demo.component.html',
  styleUrls: ['./treeview-demo.component.scss']
})

export class TreeviewDemoComponent implements OnInit {
  log: Logger;
  filesTree0: TreeNode[] = [];
  selectedFile: TreeNode;
  items: any;
  loading: Boolean = false;

  constructor(
    private treeviewDemoService: TreeviewDemoService,
    private loggerFactory: LoggerFactory,
    private modalService: BsModalService) {
    this.log = this.loggerFactory.getLogger();
  }

  ngOnInit() {
    this.getRootList(); // 获取一级节点

    this.items = [
      {
        label: '新增同级节点',
        icon: 'fa fa-link',
        command: (event: any) => this.addNode(this.selectedFile, 'sameLevel')
      },
      {
        label: '新增子级节点',
        icon: 'fa fa-chain-broken',
        command: (event: any) => this.addNode(this.selectedFile, 'subLevel')
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
  }

  // 获取一级
  getRootList() {
    this.loading = true;

    this.treeviewDemoService.getRootList().subscribe((response: any) => {
      this.loading = false;
      const nodeData = [];
      for (const row of response) {
        const oneData = this.processingNodeData(row);
        nodeData.push(oneData);
      }
      this.filesTree0 = nodeData;
    }, (error: any) => this.log.error('列表获取失败。', error));
  }

  // 获取子级
  getChildrenList(event: any) {
    if (event.node) {
      this.loading = true;
      this.treeviewDemoService.getChildrenList(event.node.id).subscribe((nodes: any) => {
        this.loading = false;
        const nodeArr = [];
        for (const row of nodes) {
          const oneData = this.processingNodeData(row);
          nodeArr.push(oneData);
        }
        event.node.children = nodeArr;
      }, (error: any) => this.log.error('子级获取失败。', error));
    }
  }

  // 创建节点
  addNode(row: TreeNode, level: string) {
    row['level'] = level;
    const initialState = { node: row };
    this.modalService.show(CreateNodeModalComponent, { initialState });

    const onHidden = this.modalService.onHidden.subscribe(() => {
      this.getRootList();
      onHidden.unsubscribe();
    });

  }
  // 编辑节点
  editNode(row: any) {
    const initialState = { node: row };
    this.modalService.show(EditNodeModalComponent, { initialState });

    const onHidden = this.modalService.onHidden.subscribe(() => {
      this.getRootList();
      onHidden.unsubscribe();
    });

  }
  // 移除节点
  removeNode(selectedFile: any) {
    const params = [selectedFile.id];
    this.treeviewDemoService.removeNode(params).subscribe((response) => {
      this.getRootList();
      this.log.success(`节点删除成功！`);
    }, error => { this.log.error(`节点删除失败，失败信息: ${error} `); });
  }

  // 处理数据
  processingNodeData(item: any): any {
    return {
      label: item.text,
      id: item.id,
      icon: item.children ? 'fa fa-github-alt' : 'fa fa-github',
      leaf: item.children ? false : true,
      parent: item.parent,
      parentId: item.parentId
    };
  }

  nodeSelect(event: any) {
    // this.selectedFile = event;
    this.log.info(`选择：${event.node.label} `);
  }

  nodeUnselect(event: any) {
    this.log.info(`取消选择：${event.node.label} `);
  }

  // 拖动节点
  nodeDrop($event: any) {
    this.treeviewDemoService.moveNode($event)
      .subscribe(() => {
        this.getRootList();
        this.log.info(`操作成功!`);
      }, error => this.log.error('操作失败', error));
  }

}

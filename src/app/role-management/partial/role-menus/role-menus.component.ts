import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, finalize } from 'rxjs/operators';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { RoleService } from '../../shared/role.service';
import { Role, Node, TreeNode } from '../../interface/interface';

@Component({
  selector: 'app-role-menus',
  templateUrl: './role-menus.component.html',
  styleUrls: ['./role-menus.component.scss']
})
export class RoleMenusComponent implements OnInit {
  role: Role;
  log: Logger;
  treeNodes1: TreeNode[] = [];
  treeNodes2: TreeNode[] = [];
  selectedNodes1: TreeNode[] = [];
  selectedNodes2: TreeNode[] = [];
  loading1: boolean = false;
  loading2: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`角色菜单`);
  }

  ngOnInit() {
    // Get role information.
    this.activatedRoute.params
      .pipe(map(params => params.id))
      .subscribe(id => {
        // Get the selected menu root list.
        this.getSelectedMenuRootList(id);

        this.roleService.getRole(id)
          .subscribe((role: Role) => this.role = role);
      });

    // Get the list of menu roots to be select.
    this.getWaitMenuRootList();

  }

  // Process node data.
  processingNodeData(item: Node): TreeNode {
    return {
      label: item.text,
      id: item.id,
      icon: item.children ? 'fa fa-th-large' : 'fa fa-th',
      leaf: item.children ? false : true,
      parentId: item.parentId
    };
  }

  // Get the selected menu root list.
  getSelectedMenuRootList(roleId: string) {
    this.loading1 = true;

    this.roleService.getRoleRootModules(roleId)
      .pipe(finalize(() => { this.loading1 = false; }))
      .subscribe((response: Node[]) => {
        const node: TreeNode[] = [];
        response.forEach(item => { node.push(this.processingNodeData(item)); });

        this.treeNodes1 = node;
      }, error => this.log.error('已选择菜单根列表获取失败。', error));
  }

  // Get the selected menu sublist.
  getSelectedMenuChildrenList(event: any) {
    if (event.node) {
      this.loading1 = true;
      this.roleService.getRoleChildModules(event.node.id)
        .pipe(finalize(() => { this.loading1 = false; }))
        .subscribe((response: Node[]) => {
          const node: TreeNode[] = [];
          response.forEach(item => { node.push(this.processingNodeData(item)); });

          event.node.children = node;
        }, error => this.log.error('子菜单列表获取失败。', error));
    }
  }

  // Get the list of menu roots to be select.
  getWaitMenuRootList() {
    this.loading2 = true;

    this.roleService.getRootModulesAndOperates()
      .pipe(finalize(() => { this.loading2 = false; }))
      .subscribe((response: Node[]) => {
        const node: TreeNode[] = [];
        response.forEach(item => { node.push(this.processingNodeData(item)); });

        this.treeNodes2 = node;
      }, error => this.log.error('菜单根列表获取失败。', error));
  }

  // Get the list of menu sublists to select.
  getWaitMenuChildrenList(event: any) {
    if (event.node) {
      this.loading2 = true;
      this.roleService.getChildModulesAndOperates(event.node.id)
        .pipe(finalize(() => { this.loading2 = false; }))
        .subscribe((response: Node[]) => {
          const node: TreeNode[] = [];
          response.forEach(item => { node.push(this.processingNodeData(item)); });

          event.node.children = node;
        }, error => this.log.error('子菜单列表获取失败。', error));
    }
  }

  // Add an menu module.
  addMenuModule() {
    const ids: string[] = [];
    this.selectedNodes2.forEach(item => { ids.push(item.id); });
    const params = { moduleIds: ids, roleId: this.role.id };

    this.roleService.addRoleModules(params)
      .subscribe(() => {
        this.getSelectedMenuRootList(this.role.id);
        this.selectedNodes2.length = 0;
        this.log.success(`添加成功！`);
      }, error => { this.log.error('添加失败。', error); });
  }

  // Remove the menu module.
  removeMenuModule() {
    const ids: string[] = [];
    this.selectedNodes1.forEach(item => { ids.push(item.id); });

    this.roleService.removeRoleModules(ids)
      .subscribe(() => {
        this.selectedNodes1.length = 0;
        this.removeNode(ids, this.treeNodes1);
        this.log.success(`移除成功！`);
      }, error => { this.log.error('移除失败。', error); });
  }

  // When the menu module is removed successfully, the node is removed from the node tree.
  removeNode(ids: string[], nodes: TreeNode[]) {
    ids.forEach(id => {
      nodes.forEach(item => {
        if (id === item.id) {
          const index = nodes.findIndex(node => id === node.id);
          nodes.splice(index, 1);
        } else if (item.children && item.children.length > 0) {
          this.removeNode([id], item.children);
        }
      });
    });
  }

}

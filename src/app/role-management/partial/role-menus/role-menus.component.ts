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
    // 获取角色信息
    this.activatedRoute.params.pipe(map(params => params.id)).subscribe(id => {
      this.roleService.getRole(id).subscribe((role: Role) => this.role = role);

      // 获取已有菜单根列表
      this.getSelectedMenuRootList(id);
    });

    // 获取待选择的菜单根列表
    this.getWaitMenuRootList();

  }

  // 处理节点数据
  processingNodeData(item: Node): TreeNode {
    return {
      label: item.text,
      id: item.id,
      icon: item.children ? 'fa fa-th-large' : 'fa fa-th',
      leaf: item.children ? false : true,
      parentId: item.parentId
    };
  }

  // 获取已有根级菜单节点
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

  // 获取已有子级菜单节点
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

  // 获取待选择根级菜单节点
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

  // 获取带选择子级菜单节点
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

  // 添加菜单模块
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

  // 移除菜单模块
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

  // 移除菜单模块成功时，从节点树移除节点
  removeNode(ids: string[], nodes: TreeNode[]) {
    ids.forEach(id => {
      nodes.forEach(item => {
        if (id === item.id) {
          const index = nodes.findIndex(node => { return id === node.id; });
          nodes.splice(index, 1);
        } else if (item.children && item.children.length > 0) {
          this.removeNode([id], item.children);
        }
      });
    });
  }

}

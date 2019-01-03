import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IOption } from 'ng-select';
import { TreeNode } from 'primeng/api';

import { Department, Node } from '../../../interface/interface';
import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { RoleService } from '../../../shared/role.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {
  log: Logger;
  mechanismList: IOption[] = [];
  departmentList: Department[] = [];
  nodeTrees: TreeNode[] = [];
  selectedNode: TreeNode;
  loading: boolean = false;
  roleId: string;

  @Output() company = new EventEmitter();

  constructor(
    private roleService: RoleService,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`机构`);
  }

  ngOnInit() {
    // Load department type list
    this.loadDepartmentTypeList();
  }

  // Load department type list(select)
  loadDepartmentTypeList() {
    this.roleService.getDepartmentTypeList().subscribe(response => {
      const mechanismList: IOption[] = [];

      for (const res of response) {
        mechanismList.push({ label: res.name, value: res.id });
      }

      this.mechanismList = mechanismList;
    }, error => {
      this.log.error('部门类型获取失败。', error);
    });
  }

  // Process the returned tree node data
  processingNodeData(item: Node) {
    return {
      label: item.text,
      id: item.id,
      icon: item.children ? 'fa fa-th-large' : 'fa fa-th',
      leaf: item.children ? false : true,
      parentId: item.parentId
    };
  }

  // Get depert list(tree)
  getRootDepertList(row: IOption) {
    const id = row.value;
    this.loading = true;

    this.roleService.getRootDepertList(id).subscribe((response: any) => {
      this.loading = false;
      const node = [];
      for (const res of response) {
        const oneData = this.processingNodeData(res);
        node.push(oneData);
      }
      this.nodeTrees = node;
    }, (error: any) => this.log.error('数据获取失败。', error));

  }

  // Get deper child list(tree)
  getDeperChildtList(event: any) {
    const id = event.node.id;
    this.loading = true;

    this.roleService.getChildDepertList(id).subscribe(response => {
      this.loading = false;
      const nodeChild = [];
      for (const res of response) {
        const nodeItem = this.processingNodeData(res);
        nodeChild.push(nodeItem);
      }
      event.node.children = nodeChild;
    }, (error: any) => this.log.error('子级获取失败。', error));
  }

  nodeSelect(event: any) {
    console.log(event);
    this.company.emit(event.node);
  }

}

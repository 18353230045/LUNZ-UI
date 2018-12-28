import { Component, OnInit } from '@angular/core';

import { IOption } from 'ng-select';

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
  departmentList: any[] = [];

  constructor(
    private roleService: RoleService,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`机构`);
  }

  ngOnInit() {
    this.loadDepartmentTypeList();
  }

  // Load department type list
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

  // Get depert list info
  getDepertListInfo(row: IOption) {
    const id = row.value;

    this.roleService.getDepertList(id).subscribe(response => {
      const node = [];
      for (const item of <any>response) {
        node.push(this.dbDataToTreeNode(item));
      }
      this.departmentList = node;
    }, error => {
      this.log.error('部门获取失败!', error);
    });
  }

  dbDataToTreeNode(dbData: any): any {
    const oneData = {
      id: dbData.id,
      name: dbData.text,
      checked: false,
      hasChildren: dbData.children,
      type: dbData.type,
      icon: 'fa fa-folder'
    };

    if (dbData.type === `company`) {
      oneData.icon = 'fa fa-file';
    } else if (dbData.type === 'depart') {
      oneData.icon = 'fa fa-puzzle-piece';
    }

    return oneData;
  }

}

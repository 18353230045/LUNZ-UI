export interface Role {
  applicationId?: string;
  code?: string;
  id?: string;
  name?: string;
  remark?: string;
  shortName?: string;
  sortOrder?: number;
}

export interface Department {
  email: string;
  id: string;
  loginName: string;
  loginTimes: string;
  mobile: string;
  name: string;
  userId: string;
}

export interface Node {
  children: boolean;
  icon: string;
  id: string;
  item: {};
  parentId: string;
  state: { opened: boolean; disabled: boolean; selected: boolean; type: string };
  text: string;
  type: string;
}

export interface TreeNode {
  label: string;
  id: string;
  icon: string;
  leaf: boolean;
  parentId: string;
  children?: TreeNode[];
}

export interface RoleUser {
  email: string;
  id: string;
  loginName: string;
  loginTimes: string;
  mobile: string;
  name: string;
  userId: string;
}

export interface User {
  approved: boolean;
  beginDay: string;
  code: string | number;
  companyId: string;
  companyName: string;
  createdAt: string;
  createdById: string;
  deleted: boolean;
  deletedAt: string;
  deletedById: string;
  departId: string;
  departName: string;
  email: string;
  enabled: boolean;
  endDay: string;
  id: string;
  idCard: string;
  latestLoginAt: string;
  loginName: string;
  loginPass: string;
  loginTimes: number;
  mobile: string;
  name: string;
  qQNumber: string;
  remark: string;
  reportLine: string;
  shortName: string;
  sortOrder: number;
  sys_RoleUser: any;
  updatedAt: string;
  updatedById: string;
  weChartNaumber: string;
  weChartOpenId: string;
}

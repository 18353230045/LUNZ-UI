import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { WebApiResultResponse } from '@core/http/web-api-result-response';
import { AuthenticationService } from '@core/authentication/authentication.service';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeviewDemoService extends WebApiResultResponse {
  applicationId = '4f500000-4c4f-0200-6a51-08d4ccde1a4a';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
    super();
  }

  // 获取根列表
  getRootList(): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListRootModulesAndOperates');
    const params = { applicationId: this.applicationId };

    return this.http.get(initReqestOption.url, {
      headers: initReqestOption.header,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 获取子列表
  getChildrenList(parentId: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListChildModulesAndOperates');

    const params = { parentId: parentId };

    return this.http.get(initReqestOption.url, {
      headers: initReqestOption.header,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 创建节点
  createNode(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Module/Add');

    const params = {
      ApplicationId: this.applicationId,
      ParentId: entity.parentId,
      Name: entity.name,
    };

    return this.http.post(initReqestOption.url, params, {
      headers: initReqestOption.header,
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 编辑节点
  editNode(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Module/Update');

    const params = {
      ApplicationId: this.applicationId,
      ParentId: entity.parentId,
      Name: entity.name,
      id: entity.id,
    };

    return this.http.post(initReqestOption.url, params, {
      headers: initReqestOption.header,
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 移除节点
  removeNode(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Module/Delete');

    return this.http.post(initReqestOption.url, entity, {
      headers: initReqestOption.header,
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 拖动节点
  moveNode(event: any): Observable<any> {
    const initReqestOption = this.initRequest('Module/MoveModule');

    const params = {
      id: event.dragNode.id,
      parentId: event.dragNode.parentId,
      position: event.dropIndex,
    };

    return this.http.post(initReqestOption.url, params, {
      headers: initReqestOption.header,
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  private initRequest(action: any) {
    return {
      url: `${environment.api.userCenter.baseUrl}${action}`,
      header: new HttpHeaders({
        'AppKey': environment.api.userCenter.appKey,
        'AuthToken': this.authenticationService.credentials.token
      })
    };
  }

}

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

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {
    super();
  }

  // 获取根列表
  getRootList(appId: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListRootModulesAndOperates');
    const params = {
      applicationId: appId
    };

    return this.http.get(initReqestOption.url, {
      headers: initReqestOption.header,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 获取子列表
  getChildrenList(parentId: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListChildModulesAndOperates');
    const params = {
      parentId: parentId
    };

    return this.http.get(initReqestOption.url, {
      headers: initReqestOption.header,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 拖动节点
  moveNode(event: any): Observable<any> {
    const initReqestOption = this.initRequest('Module/MoveModule');
    const params = {
      id: event.node.id,
      parentId: event.to.parent.id,
      position: event.to.index,
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

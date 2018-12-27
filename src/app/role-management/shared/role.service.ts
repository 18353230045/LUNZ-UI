import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WebApiResultResponse, PagingResponse } from '@core/http/web-api-result-response';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { AuthenticationOAuth2Service } from '@core/authentication/authentication-oauth2.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends WebApiResultResponse {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private authenticationOAuth2Service: AuthenticationOAuth2Service) {
    super();
  }

  // Get app roles
  getAppRoles(params: any): Observable<PagingResponse> {
    const initReqestOption = this.initRequest('Role/List');
    params.applicationId = environment.api.v1.applicationId;

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Create role
  createRole(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/AddRole');

    return this.http.post(initReqestOption.url, entity, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Update role
  updateRole(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/UpdateRole');

    return this.http.post(initReqestOption.url, entity, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Delete role
  deleteRole(id: Array<string>): Observable<any> {
    const initReqestOption = this.initRequest('Role/DeleteRoles');

    return this.http.post(initReqestOption.url, id, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Get role
  getRole(roleId: string): Observable<PagingResponse> {
    const initReqestOption = this.initRequest('Role/GetRole');
    const params = { roleId: roleId };

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // List root modules and operates
  listRootModulesAndOperates(appId: string): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListRootModulesAndOperates');
    const params = { applicationId: environment.api.v1.applicationId };

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // List child modules and operates
  listChildModulesAndOperates(parentId: string): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListChildModulesAndOperates');
    const params = { parentId: parentId };

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // List role root modules
  listRoleRootModules(roleId: string): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListRoleRootModules');
    const params = { roleId: roleId };

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // List role child modules
  listRoleChildModules(id: string): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListRoleChildModules');
    const params = { roleOperateId: id };

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Add role modules
  addRoleModules(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/AddRoleModules');

    return this.http.post(initReqestOption.url, entity, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Remove role modules
  removeRoleModules(id: Array<any>): Observable<any> {
    const initReqestOption = this.initRequest('Role/RemoveRoleModules');

    return this.http.post(initReqestOption.url, id, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // List role users
  listRoleUsers(params: any, roleId: string, departId: string): Observable<PagingResponse> {
    const initReqestOption = this.initRequest('Role/ListRoleUsers');
    params.roleId = roleId;
    params.departId = departId;

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Add users to role
  addUsersToRole(entity: any): Observable<any> {
    const initReqestOption = this.initRequest('Role/AddUsersToRole');

    return this.http.post(initReqestOption.url, entity, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Delete role users
  deleteRoleUsers(roleUserIds: Array<string>): Observable<any> {
    const initReqestOption = this.initRequest('Role/DeleteRoleUsers');

    return this.http.post(initReqestOption.url, roleUserIds, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Get user list
  getUserList(params: any, departId: string): Observable<PagingResponse> {
    const initReqestOption = this.initRequest('Role/ListUsers');
    params.departId = departId;

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Get depert list
  getDepertList(typeId: string): Observable<PagingResponse> {
    const initReqestOption = this.initRequest('Role/ListRootDeparts');
    const params: any = { typeId: typeId };
    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Get deper childt list
  getDeperChildtList(departId: string): Observable<any> {
    const initReqestOption = this.initRequest('Role/ListChildDeparts');
    const params = { departId: departId };

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader,
      params: params
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // Get department type list
  getDepartmentTypeList(): Observable<any> {
    const initReqestOption = this.initRequest('DepartmentType/GetDepartmentTypeList');

    return this.http.cache(false).get(initReqestOption.url, {
      headers: initReqestOption.requestHeader
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  initRequest(action: string) {
    const claims: any = this.authenticationService.credentials;

    return {
      url: `${environment.api.userCenter.baseUrl}${action}`,
      requestHeader: new HttpHeaders({
        'appKey': environment.api.userCenter.appKey,
        'authToken': claims.token
      })
    };
  }
}

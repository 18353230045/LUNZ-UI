import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { WebApiResultResponse } from '@core/http/web-api-result-response';

@Injectable()
export class Select2Service extends WebApiResultResponse {

  constructor(private http: HttpClient) { super(); }

  // 根据客户名称检索客户(10条)
  getCustomerByTextSameName(params: any): Observable<any> {
    const url = environment.api.customerCenter.baseUrl + 'CustActives/GetCustActivesByNameText';
    return this.http.get(url, {
      params: { nametext: params.context },
      headers: new HttpHeaders({
        'AppKey': environment.api.customerCenter.appKey
      })
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 根据门店Id获取门店关联仓库结合
  getWarehomeByStoreId(storeId: any): Observable<any> {
    const url = environment.api.customerCenter.baseUrl + 'CustStore/GetStoreWareHomeByStoreId';
    return this.http.get(url, {
      params: { storeid: storeId },
      headers: new HttpHeaders({
        'AppKey': environment.api.customerCenter.appKey
      })
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }
}

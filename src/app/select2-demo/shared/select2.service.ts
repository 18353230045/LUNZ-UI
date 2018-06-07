import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { WebApiResultResponse } from '../../core/http/web-api-result-response';

@Injectable()
export class Select2Service extends WebApiResultResponse {

    constructor(private http: Http) {
        super();
    }

    // 根据客户名称检索客户(10条)
    getCustomerByTextSameName(params: any): Observable<any> {
        const url = environment.api.customerCenter.baseUrl + 'CustActives/GetCustActivesByNameText';
        return this.http.get(url, {
            cache: false,
            params: {
                nametext: params.context
            },
            headers: new Headers({
                'AppKey': environment.api.customerCenter.appKey
            })
        })
            .map(super.handleSuccess)
            .catch(super.handleError);
    }

    // 根据门店Id获取门店关联仓库结合
    getWarehomeByStoreId(storeId: any): Observable<any> {
        const url = environment.api.customerCenter.baseUrl + 'CustStore/GetStoreWareHomeByStoreId';
        return this.http.get(url, {
            cache: false,
            params: {
                storeid: storeId
            },
            headers: new Headers({
                'AppKey': environment.api.customerCenter.appKey
            })
        })
            .map(super.handleSuccess)
            .catch(super.handleError);
    }
}

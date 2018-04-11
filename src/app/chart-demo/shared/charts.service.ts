import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';

@Injectable()
export class ChartsService extends WebApiResultResponse {

    constructor(private http: Http) {
        super();
    }


    getChartsData(params: any): Observable<PagingResponse> {

        const url = 'orders';

        return this.http.get(url, {
            params: params
        })
            .map(super.handleSuccess)
            .catch(super.handleError);
    }

}

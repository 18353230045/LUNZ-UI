import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrdersService extends WebApiResultResponse {

  constructor(private http: Http) {
    super();
  }

  getOrders(params: any): Observable<PagingResponse> {

    const url = super.resolveV2Url('orders');

    return this.http.get(url, {
      params: params
    })
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  getOrder(orderId: any): Observable<any> {

    const url = super.resolveV2Url(`order/${orderId}`);

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  createOrder(entity: any): Observable<any> {

    const url = super.resolveV2Url('order');

    return this.http.post(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  updateOrder(entity: any): Observable<any> {

    const url = super.resolveV2Url(`order/${entity.id}`);

    return this.http.put(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  deleteOrder(entity: any): Observable<any> {

    const url = super.resolveV2Url(`order/${entity.id}`);

    return this.http.delete(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  hasValue(str: any): boolean {
    return str && str !== null && str !== '' && str !== undefined;
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';
import { environment } from '../../../environments/environment';
import { IResponse, IQueryGroup, IOrderDetails } from '../../shared/models/microservice-template';

@Injectable()
export class OrdersService extends WebApiResultResponse {

  constructor(private http: Http) {
    super();
  }

  getOrders(params: IQueryGroup): Observable<IResponse> {

    const url = environment.microservice.serverUrl + 'orders';

    return this.http.get(url, {
      params: params
    })
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  getOrder(orderId: string): Observable<IOrderDetails> {

    const url = environment.microservice.serverUrl + `order/${orderId}`;

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  createOrder(entity: IOrderDetails): Observable<IOrderDetails> {

    const url = environment.microservice.serverUrl + 'order';

    return this.http.post(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  updateOrder(entity: IOrderDetails) {

    const url = environment.microservice.serverUrl + `order/${entity.id}`;

    return this.http.put(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  deleteOrder(entity: IOrderDetails) {

    const url = environment.microservice.serverUrl + `order/${entity.id}`;

    return this.http.delete(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  hasValue(str: any): boolean {
    return str && str !== null && str !== '' && str !== undefined;
  }

}

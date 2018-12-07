import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends WebApiResultResponse {

  constructor(private http: HttpClient) {
    super();
  }

  getOrders(params: HttpParams): Observable<PagingResponse> {
    const url = 'orders';
    return this.http.get(url, { params: params }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  getOrdersCount(params: HttpParams): Observable<PagingResponse> {
    const url = 'orders';
    return this.http.get(url, { params: params }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  getOrder(orderId: any): Observable<PagingResponse> {
    const url = `orders/${orderId}`;
    return this.http.get(url).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  createOrder(entity: any): Observable<any> {
    const url = 'orders';
    return this.http.post(url, entity).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  updateOrder(entity: any): Observable<any> {
    const url = `orders/${entity.id}`;
    return this.http.put(url, entity).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  deleteOrder(entity: any): Observable<any> {
    const url = `orders/${entity.id}`;
    return this.http.delete(url).pipe(map(super.handleSuccess), catchError(super.handleError));
  }
}

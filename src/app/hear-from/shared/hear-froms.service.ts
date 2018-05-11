import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';
import { environment } from '../../../environments/environment';

@Injectable()
export class HearFromsService extends WebApiResultResponse {

  constructor(private http: Http) {
    super();
  }

  getHearFroms(params: any): Observable<PagingResponse> {

    const url = super.resolveV2Url('hear-froms');

    return this.http.get(url, {
      params: params
    })
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  getHearFrom(hearFromId: any): Observable<any> {

    const url = super.resolveV2Url(`hear-from/${hearFromId}`);

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  createHearFrom(entity: any): Observable<any> {

    const url = super.resolveV2Url('hear-from');

    return this.http.post(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  updateHearFrom(entity: any): Observable<any> {

    const url = super.resolveV2Url(`hear-from/${entity.id}`);

    return this.http.put(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  deleteHearFrom(entity: any): Observable<any> {

    const url = super.resolveV2Url(`hear-from/${entity.id}`);

    return this.http.delete(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  getHearFromList(): Observable<any> {

    const url = super.resolveV2Url('hearfroms');

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }
}

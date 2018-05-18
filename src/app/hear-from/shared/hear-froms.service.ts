import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse, PagingResponse } from '../../core/http/web-api-result-response';
import { environment } from '../../../environments/environment';
import { IResponse2, IQueryGroup, IHearFromDetails } from '../../shared/models/microservice-template';

@Injectable()
export class HearFromsService extends WebApiResultResponse {

  constructor(private http: Http) {
    super();
  }

  getHearFroms(params: IQueryGroup): Observable<IResponse2> {

    const url = super.resolveV2Url('hear-froms');

    return this.http.get(url, {
      params: params
    })
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  getHearFrom(hearFromId: string): Observable<IHearFromDetails> {

    const url = super.resolveV2Url(`hear-from/${hearFromId}`);

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  createHearFrom(entity: IHearFromDetails): Observable<IHearFromDetails> {

    const url = super.resolveV2Url('hear-from');

    return this.http.post(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  updateHearFrom(entity: IHearFromDetails) {

    const url = super.resolveV2Url(`hear-from/${entity.id}`);

    return this.http.put(url, entity)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  deleteHearFrom(entity: IHearFromDetails) {

    const url = super.resolveV2Url(`hear-from/${entity.id}`);

    return this.http.delete(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }
}

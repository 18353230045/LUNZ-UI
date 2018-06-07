import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WebApiResultResponse } from '../../core/http/web-api-result-response';
import { IHearFromDetails } from '../models/microservice-template';

@Injectable()
export class ReferenceDataService extends WebApiResultResponse {

  constructor(private http: Http) {
    super();
  }

  getHearFroms(): Observable<Array<IHearFromDetails>> {

    const url = this.getUrl('hear-froms');

    return this.http.get(url)
      .map(super.handleSuccess)
      .catch(super.handleError);
  }

  private getUrl(endpoint: string): string {
    return super.resolveV2Url('reference-data/' + endpoint);
  }
}

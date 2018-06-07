import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import { camelCaseObject } from './http-helper';

export interface PagingResponse {
  count: number;
  data: any;
}

export class WebApiResultResponse {

  constructor() { }

  handleSuccess(response: Response): any | PagingResponse {
    let result: any;

    try {
      result = response.json();
    } catch (Error) {
      return response;
    }

    if (result && result.Success && result.Success !== undefined) {

      result = camelCaseObject(result);

      if (!result.success) {
        throw new Error(result.allMessages);
      }

      if (result.rowsCount !== undefined) {
        return {
          count: result.rowsCount,
          data: result.data
        };
      } else {
        return result.data;
      }
    } else {
      return result;
    }

  }

  handleError(error: any): Observable<any> {
    if (error.ok === undefined || error.status === undefined || error.statusText === undefined) {
      return Observable.throw(error);
    } else {
      if (error.status && error.status === 400) {
        return Observable.throw(error.json());
      }
      return Observable.throw(error);
    }
  }

  resolveUrl(url: string, version?: string): string {
    let settings: any;

    if (version) {
      settings = environment.api[version];
    } else {
      settings = environment.api[environment.api.default];
    }

    return settings.baseUrl + url;
  }

  resolveV1Url(url: string): string {
    return this.resolveUrl(url, 'v1');
  }

  resolveV2Url(url: string): string {
    return this.resolveUrl(url, 'v2');
  }
}

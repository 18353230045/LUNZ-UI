import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { WebApiResultResponse } from '@app/core';
import { IHearFromDetails } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService extends WebApiResultResponse {

  constructor(private http: HttpClient) {
    super();
  }

  getHearFroms(): Observable<Array<IHearFromDetails>> {
    const url = this.getUrl('hear-froms');
    return this.http.get(url)
      .pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  private getUrl(endpoint: string): string {
    return super.resolveV2Url('reference-data/' + endpoint);
  }
}

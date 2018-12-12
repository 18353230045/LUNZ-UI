import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '@core/authentication/authentication.service';
import { environment } from '@env/environment';
import { WebApiResultResponse } from '@core/http/web-api-result-response';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends WebApiResultResponse {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    super();
  }

  // 获取字母表
  letterList(): Array<any> {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  }

  // 获取车品牌
  getCarbrand(code: string): Observable<any> {
    const url = environment.api.dataCenter.baseUrl + 'vehicle/Brand/TreeList';

    return this.http.get(url, {
      params: {
        'appKey': environment.api.dataCenter.appKey,
        'authToken': this.authenticationService.credentials.token,
        'code': code,
        'query': ' '
      }
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 获取车系列
  getCarSeries(parentId: string): Observable<any> {
    const url = environment.api.dataCenter.baseUrl + 'vehicle/Brand/GetChildListByParentId';

    return this.http.get(url, {
      params: {
        'appKey': environment.api.dataCenter.appKey,
        'authToken': this.authenticationService.credentials.token,
        'parentId': parentId,
        'query': ' '

      }
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  // 获取车型号
  getCarModels(seriesId: string): Observable<any> {
    const url = environment.api.dataCenter.baseUrl + 'vehicle/Info/YearInfoListBySeriesID';

    return this.http.get(url, {
      params: {
        'appKey': environment.api.dataCenter.appKey,
        'authToken': this.authenticationService.credentials.token,
        'seriesId': seriesId,
        'query': ' '
      }
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }
}

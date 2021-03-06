import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { WebApiResultResponse } from '@core/http/web-api-result-response';
import { AuthenticationService, Credentials } from '@core/authentication/authentication.service';
import { AuthenticationOAuth2Service } from '@core/authentication/authentication-oauth2.service';

export interface Profile {
  displayName: string;
  username: string;
}

@Injectable()
export class ProfileService extends WebApiResultResponse {

  private _profile: Profile;
  private _credentials: Credentials;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private authenticationOAuth2Service: AuthenticationOAuth2Service) {
    super();

    if (this.authenticationService.isUsing()) {
      this._credentials = this.authenticationService.credentials;
    }

    if (this.authenticationOAuth2Service.isUsing()) {
      const claims = this.authenticationOAuth2Service.claims;
      this._credentials = {
        username: claims.username,
        token: claims.authToken
      };
    }
  }

  /**
   * Get the curent user's profile.
   * @return {Observable<Profile>} The curent user's profile details.
   */
  getProfile(): Observable<Profile> {

    if (this._profile && this._profile != null) {
      return of(this._profile);
    }

    if (this.authenticationOAuth2Service.isUsing()) {
      const claims = this.authenticationOAuth2Service.claims;
      this._profile = {
        displayName: claims.name,
        username: claims.username
      };
      return of(this._profile);
    }

    if (this.authenticationService.isUsing()) {
      const url = 'membership/getUserInfo';

      return this.http.get(url)
        .pipe(map(super.handleSuccess), catchError(super.handleError));
    }
  }

  /**
   * Get the current user's menu items.
   * @return {Observable<any>} The current user's menu items.
   */
  getMenus(): Observable<any> {
    const url = environment.api.userCenter.baseUrl + 'membership/getCurrentUserMenuItems';

    return this.http.get(url, {
      headers: new HttpHeaders({
        'appKey': environment.api.userCenter.appKey,
        'authToken': this._credentials.token,
        'X-XSS-Protection': '1',
        'X-Content-Type-Options': 'nosniff'
      })
    }).pipe(map((response: any) => {
      const menuItems = super.handleSuccess(response);
      if (menuItems) {
        this.setMenuItems(menuItems);
        return menuItems;
      }
    }), catchError(super.handleError));
  }

  getApps(): Observable<any> {
    const url = environment.api.userCenter.baseUrl + 'membership/getUserApps';
    const username = this._credentials.username;

    return this.http.get(url, {
      headers: new HttpHeaders({
        'AppKey': environment.api.userCenter.appKey,
        'X-XSS-Protection': '1',
        'X-Content-Type-Options': 'nosniff'
      }),
      params: {
        'username': username
      }
    }).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  /**
   * Change the current user's password.
   * @return {Observable<boolean>} True if the user's password was changed successfully.
   */
  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<boolean> {
    const url = 'membership/ChangePassword';
    const params = {
      'oldPassword': oldPassword,
      'newPassword': newPassword
    };
    return this.http.post(url, params).pipe(map(super.handleSuccess), catchError(super.handleError));
  }

  private setProfile(data: any): Profile {
    this._profile = {
      displayName: data.DisplayName,
      username: data.Username
    };
    return this._profile;
  }

  private setMenuItems(menuItems: any) {
    for (let i = menuItems.length - 1; i >= 0; i--) {
      const menuItem = menuItems[i];
      if (!menuItem.visible) {
        menuItems.splice(i, 1);
      }

      this.setMenuItems(menuItem.children);
    }
  }
}

import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User, Log } from 'oidc-client';

import { environment } from '../../../environments/environment';
import { promise } from 'protractor';


@Injectable()
export class AuthenticationOAuth2Service {

  private _credentials: User;
  private _userManager: UserManager;

  constructor() {
    this._userManager = new UserManager(environment.odic.config);

    Log.logger = console;
  }

  isUsing(): boolean {
    return environment.authentication.type === 'oauth2';
  }

  signin(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  signinCallback(): Promise<void> {
    return this._userManager.signinRedirectCallback().then((user: any) => {
      this.setCredentials(user);
    });
  }

  signout(): Promise<User> {
    return this._userManager.signoutRedirect();
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get claims(): any {
    return this.credentials.profile;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): User {
    return this._credentials;
  }

  getAuthorizationHeaderValue(): string {
    return `${this._credentials.token_type} ${this._credentials.access_token}`;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   */
  private setCredentials(credentials?: User) {
    this._credentials = credentials || null;
  }
}

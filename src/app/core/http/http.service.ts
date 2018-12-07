import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';

import { AuthenticationService, Credentials } from '../authentication/authentication.service';
import { AuthenticationOAuth2Service } from '../authentication/authentication-oauth2.service';
import { environment } from '@env/environment';

import { toURLSearchParams } from './http-helper';

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/src/client' {

  // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
  // HttpClient with HttpService using dependency injection
  export interface HttpClient {

    /**
     * Enables caching for this request.
     * @param {boolean} forceUpdate Forces request to be made and updates cache entry.
     * @return {HttpClient} The new instance.
     */
    cache(forceUpdate?: boolean): HttpClient;

    /**
     * Skips default error handler for this request.
     * @return {HttpClient} The new instance.
     */
    skipErrorHandler(): HttpClient;

    /**
     * Do not use API prefix for this request.
     * @return {HttpClient} The new instance.
     */
    disableApiPrefix(): HttpClient;

  }

}

// From @angular/common/http/src/interceptor: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {

  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }

}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */

declare const URI: any;

@Injectable()
export class HttpService extends HttpClient {

  private _apiSettings: any;

  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []) {
    super(httpHandler);
    this._apiSettings = environment.api[environment.api.default];

    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [
        this.injector.get(ApiPrefixInterceptor),
        this.injector.get(ErrorHandlerInterceptor)
      ];
    }
  }

  cache(forceUpdate?: boolean): HttpClient {
    const cacheInterceptor = this.injector.get(CacheInterceptor).configure({ update: forceUpdate });
    return this.addInterceptor(cacheInterceptor);
  }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  disableApiPrefix(): HttpClient {
    return this.removeInterceptor(ApiPrefixInterceptor);
  }

  // Override the original method to wire interceptors when triggering the request.
  request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler
    );

    // url = this._apiSettings.baseUrl + url;
    const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
    const credentials: Credentials =
      authenticationService.isAuthenticated() ? authenticationService.credentials : null;
    const token: string = credentials == null ? 'null' : credentials.token;
    const authenticationOAuth2Service: AuthenticationOAuth2Service = this.injector.get(AuthenticationOAuth2Service);
    const authorization = authenticationOAuth2Service.getAuthorizationHeaderValue();

    if ((options.headers && options.headers.Authorization) && authorization) {
      options.headers.append(new HttpHeaders().set('Authorization', authorization));
    }

    if (options && options != null && options.params && options.params != null) {
      if (!options.params['map']) {
        options.params = toURLSearchParams(options.params);
      }
    }

    const regex = new RegExp('^(http://|https://|//)');
    if (!regex.test(url)) {
      url = this._apiSettings.baseUrl + url;
      if (this._apiSettings.withHeaders) {
        // You can customize the 'headers' here.
        const headers = new HttpHeaders().set('AppKey', this._apiSettings.appKey).set('AuthToken', token);

        if (options.headers) {
          options.headers.append(headers);
        } else {
          options.headers = headers;
        }
      } else {
        const urlParser: any = URI(url);
        if (!urlParser.hasQuery('AppKey')) {
          urlParser.addSearch('AppKey', this._apiSettings.appKey);
        }
        if (!urlParser.hasQuery('AuthToken')) {
          urlParser.addSearch('AuthToken', token);
        }
      }
    }
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType))
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.concat([interceptor])
    );
  }
}

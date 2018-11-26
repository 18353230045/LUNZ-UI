import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service';
import { Logger } from '../logger.service';
import { LoggerFactory } from '../logger-factory.service';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  log: Logger;

  constructor(
    private router: Router,
    private injector: Injector,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger('Http Error');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {

    const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);

    if (authenticationService.isUsing()) {
      if (response && response['status'] && response['status'] === 401) {
        this.log.debug('未认证，跳转登录页...');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
          return;
        });
      }
    }

    let message = '服务器错误，请联系系统管理员。';

    if (response && response['status']) {
      switch (response['status']) {
        case 400:
          throw response;
        case 401:
          message = '未认证，需要用户登录。';
          break;
        case 403:
          message = '当前用户未被授权。';
          break;
        case 404:
          message = '访问的数据（页面）不存在。';
          break;
        case 503:
          message = '服务器服务无效，请联系系统管理员。';
          break;
        case 500:
          message = '服务器错误，请联系系统管理员。';
          break;
      }
    }
    this.log.error(message);
    throw response;
  }

}

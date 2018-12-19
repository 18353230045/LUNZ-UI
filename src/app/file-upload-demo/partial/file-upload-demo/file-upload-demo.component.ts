import { Component, OnInit, Injector } from '@angular/core';

import { Logger } from '@core/logger.service';
import { LoggerFactory } from '@core/logger-factory.service';
import { AuthenticationService, Credentials } from '@core/authentication/authentication.service';
import { environment } from '@env/environment';


@Component({
  selector: 'app-file-upload-demo',
  templateUrl: './file-upload-demo.component.html',
  styleUrls: ['./file-upload-demo.component.scss']
})

export class FileUploadDemoComponent implements OnInit {
  log: Logger;
  files: Array<any> = [];
  url: string;
  token: string;

  constructor(
    private injector: Injector,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`文件上传`);
  }

  ngOnInit() { this.url = this.getUploadOption.url; }

  get getUploadOption(): any {
    const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
    const credentials: Credentials = authenticationService.isAuthenticated() ?
      authenticationService.credentials : null;

    const token: string = credentials == null ? null : credentials.token;
    this.token = credentials == null ? null : credentials.token;

    const url: any = environment.api.userCenter.baseUrl + 'ResourceItem/AddFile';

    return { url: url, token: token };
  }

  onSelect(event: any) {
    console.log(event);
  }

  onProgress(event: any) {
    console.log(event);
  }

  onUpload(event: any) {
    console.log(event);
  }

  onBeforeSend(event: any) {
    event.xhr.setRequestHeader('AppKey', environment.api.userCenter.appKey);
    event.xhr.setRequestHeader('AuthToken', this.getUploadOption.token);
  }
}

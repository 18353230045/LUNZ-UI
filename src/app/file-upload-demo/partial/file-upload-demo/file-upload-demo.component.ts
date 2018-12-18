import { Component, OnInit, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(
    private http: HttpClient,
    private injector: Injector,
    private loggerFactory: LoggerFactory) {
    this.log = this.loggerFactory.getLogger(`文件上传`);
  }

  ngOnInit() { }

  uploadHandler(event: any) {

    for (const file of event.files) {
      const formData: FormData = new FormData();
      formData.append('inputfile', file);

      const url = this.getUploadOption.url;
      const headers = this.getUploadOption.headers;

      this.http.post(url, formData, { headers: headers }).subscribe((response) => {
        if (response['Success']) {
          this.log.success(`文件上传成功！`);
          console.log(this.files);
        } else {
          this.log.success(`文件上传失败，${response['AllMessages']}`);
        }
      });
    }
  }

  get getUploadOption(): any {
    const authenticationService: AuthenticationService = this.injector.get(AuthenticationService);
    const credentials: Credentials = authenticationService.isAuthenticated() ?
      authenticationService.credentials : null;

    const token: string = credentials == null ? null : credentials.token;

    const url = environment.api.userCenter.baseUrl + 'ResourceItem/AddFile';

    const headers = new HttpHeaders()
      .set('AppKey', environment.api.userCenter.appKey)
      .set('AuthToken', token);

    return {
      url: url,
      headers: headers
    };
  }

  onUpload(event: any) {
    for (const file of event.files) {
      console.log(file);
    }
  }

  onSelect(event: any) {
    console.log(event);
  }

  onProgress(event: any) {
    console.log(event);
  }
}

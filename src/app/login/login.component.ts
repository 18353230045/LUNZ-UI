import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { I18nService, AuthenticationService, Logger, LoggerFactory } from '@app/core';

declare const URI: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  log: Logger;

  appName: string = environment.appName;
  version: string = environment.version;
  error: string = null;
  isLoading = false;
  loginForm: FormGroup;
  forgetPassword: Boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private loggerFactory: LoggerFactory,
    private authenticationService: AuthenticationService) {
    this.createForm();
    this.log = this.loggerFactory.getLogger('Login');
  }

  ngOnInit() {
  }

  showForgetPassword() {
    this.forgetPassword = !this.forgetPassword;
  }

  login() {
    this.isLoading = true;
    sessionStorage.removeItem('logout');
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.loginForm.markAsPristine();
      })).subscribe(credentials => {
        this.log.debug(`${credentials.username} Login Successfully.`);

        const uri = new URI(location.href);
        const queryString = uri.query();

        if (queryString && queryString !== null && queryString !== '') {
          const query = URI.parseQuery(queryString.toLowerCase());
          if (query.returnurl && query.returnurl !== null && query.returnurl !== '') {
            this.router.navigateByUrl(query.returnurl);
            return;
          }
        }
        this.router.navigate(['/']);
      }, error => {
        this.error = error.message;
        this.log.debug(this.error);
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: false
    });
  }
}

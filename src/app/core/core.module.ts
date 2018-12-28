import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SsoModule } from '../sso/sso.module';
import { zhCnLocale } from 'ngx-bootstrap/locale';
import { TreeModule } from 'angular-tree-component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';

import { ProfileService } from './profile/profile.service';
import { SsoServiceService } from '../sso/shared/sso-service.service';
import { SweetAlert2Service } from '@app/shared/dialogs/sweetalert2.service';

import {
  CoreRoutingModule, AuthenticationService, AuthenticationOAuth2Service,
  AuthenticationGuard, I18nService, Dialogs, LoggerFactory, HttpService, HttpCacheService,
  ApiPrefixInterceptor, ErrorHandlerInterceptor, CacheInterceptor, InitMenutCloseDirective,
  ShellComponent, HeaderComponent, NotificationsComponent, ProfileComponent, ChangePasswordModalComponent,
  QuickActionsComponent, QuickSearchComponent, TabsComponent, TopMenuComponent, ActionsComponent,
  AppsComponent, ReportsComponent, PageHeaderComponent, BreadcrumbsComponent, NavigationComponent,
  MenuItemComponent, FooterComponent
} from '@app/core';

import { SsoRegisterComponent } from '../sso/sso-register/sso-register.component';

defineLocale('zh-cn', zhCnLocale);

@NgModule({
  imports: [
    SsoModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TreeModule.forRoot()
  ],
  declarations: [
    AppsComponent,
    TabsComponent,
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    TopMenuComponent,
    ActionsComponent,
    ReportsComponent,
    MenuItemComponent,
    NavigationComponent,
    PageHeaderComponent,
    BreadcrumbsComponent,
    SsoRegisterComponent,
    QuickSearchComponent,
    QuickActionsComponent,
    NotificationsComponent,
    ChangePasswordModalComponent,
    InitMenutCloseDirective
  ],
  entryComponents: [ChangePasswordModalComponent],
  providers: [
    Dialogs,
    I18nService,
    LoggerFactory,
    ProfileService,
    HttpCacheService,
    CacheInterceptor,
    SsoServiceService,
    SweetAlert2Service,
    AuthenticationGuard,
    ApiPrefixInterceptor,
    AuthenticationService,
    ErrorHandlerInterceptor,
    AuthenticationOAuth2Service,
    {
      provide: HttpClient,
      useClass: HttpService
    },
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale } from 'ngx-bootstrap/locale';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';
import { TreeModule } from 'angular-tree-component';

import { SharedModule } from '@app/shared/shared.module';
import { SweetAlert2Service } from '@app/shared/dialogs/sweetalert2.service';
import { SsoModule } from '../sso/sso.module';
import { SsoServiceService } from '../sso/shared/sso-service.service';
import { ProfileService } from './profile/profile.service';

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    CoreRoutingModule,
    SsoModule,
    ToastrModule,
    MomentModule,
    TreeModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    PageHeaderComponent,
    ChangePasswordModalComponent,
    MenuItemComponent,
    BreadcrumbsComponent,
    SsoRegisterComponent,
    ProfileComponent,
    QuickActionsComponent,
    NotificationsComponent,
    QuickSearchComponent,
    TopMenuComponent,
    ActionsComponent,
    ReportsComponent,
    AppsComponent,
    TabsComponent,
    InitMenutCloseDirective
  ],
  entryComponents: [
    ChangePasswordModalComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationOAuth2Service,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    Dialogs,
    SweetAlert2Service,
    SsoServiceService,
    ProfileService,
    LoggerFactory,
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

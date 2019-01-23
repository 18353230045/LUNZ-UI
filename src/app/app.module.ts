import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ToastrModule } from 'ngx-toastr';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { LaddaModule } from 'angular2-ladda';
import { MomentModule } from 'angular2-moment';
import { SweetAlertOptions } from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { SignalRModule, SignalRConfiguration, ConnectionTransports } from 'ng2-signalr';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@app/core';
import { environment } from '@env/environment';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ChangePasswordModule } from './change-password/change-password.module';

import { AppComponent } from './app.component';

const sweetAlertOptions: SweetAlertOptions = {
  buttonsStyling: false,
  allowOutsideClick: false,
  confirmButtonClass: 'btn btn-sm btn-secondary m-btn m-btn--hover-brand m-btn--pill btn-sm m-btn--wide',
  cancelButtonClass: 'btn btn-sm btn-secondary m-btn m-btn--hover-brand m-btn--pill btn-sm m-btn--wide',
  confirmButtonText: '确定',
  cancelButtonText: '取消'
};

const ngxQuerySettings: any = {
  labels: {
    misc: {
      'from': '从',
      'to': '到'
    },
    buttons: {
      'quick': '快速',
      'advanced': '高级',
      'reset': '重置',
      'search': '查询'
    },
    groupOp: {
      'and': '并且',
      'or': '或者'
    },
    fieldOp: {
      'eq': '等于',
      'ne': '不等于',
      'lt': '小于',
      'le': '小于等于',
      'gt': '大于',
      'ge': '大于等于',
      'bw': '开头是',
      'bn': '开头不是',
      'ew': '结尾是',
      'en': '结尾不是',
      'cn': '包含',
      'nc': '不包含',
      'bt': '介于'
    }
  }
};

export function getSignalrConfiguration(): SignalRConfiguration {
  const signalrConfiguration = new SignalRConfiguration();
  signalrConfiguration.hubName = 'WebHub';
  signalrConfiguration.logging = true;
  signalrConfiguration.url = environment.api.messageCenter.signalR;
  signalrConfiguration.transport = ConnectionTransports.longPolling;
  return signalrConfiguration;
}

@NgModule({
  imports: [
    CoreModule,
    HomeModule,
    FormsModule,
    LoginModule,
    LaddaModule,
    MomentModule,
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    ChangePasswordModule,
    TranslateModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    SharedModule.forRoot(sweetAlertOptions),
    NgxQueryModule.forRoot(ngxQuerySettings),
    SweetAlert2Module.forRoot(sweetAlertOptions),
    SignalRModule.forRoot(getSignalrConfiguration),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({ timeOut: 3000, progressBar: true, positionClass: 'toast-bottom-right' }),
    // Must be imported as the last module as it contains the fallback route
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

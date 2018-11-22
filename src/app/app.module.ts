import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { TranslateModule } from '@ngx-translate/core';
import { LaddaModule } from 'angular2-ladda';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlertOptions } from 'sweetalert2';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { SignalRModule, SignalRConfiguration, ConnectionTransports } from 'ng2-signalr';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
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
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 3000, progressBar: true, positionClass: 'toast-bottom-right' }),
    SweetAlert2Module.forRoot(sweetAlertOptions),
    SignalRModule.forRoot(getSignalrConfiguration),
    LaddaModule,
    CoreModule,
    SharedModule.forRoot(sweetAlertOptions),
    HomeModule,
    LoginModule,
    AuthenticationModule,
    ChangePasswordModule,
    // must be imported as the last module as it contains the fallback route
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

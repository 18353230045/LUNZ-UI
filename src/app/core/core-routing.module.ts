import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '@app/core/route.service';

const routes: Routes = RouteExtensions.withShell([
  { path: '', loadChildren: '../home/home.module#HomeModule' },
  { path: '', loadChildren: '../about/about.module#AboutModule' },
  { path: '', loadChildren: '../contact-us/contact-us.module#ContactUsModule' },
  { path: '', loadChildren: '../messages/web-message.module#WebMessageModule' },
  { path: '', loadChildren: '../help/help.module#HelpModule' },
  { path: '', loadChildren: '../form-demo/form-demo.module#FormDemoModule' },
  { path: '', loadChildren: '../select-selection-demo/select-selection-demo.module#SelectSelectionDemoModule' },
  { path: '', loadChildren: '../select2-demo/select2-demo.module#Select2DemoModule' },
  { path: '', loadChildren: '../switch-demo/switch-demo.module#SwitchDemoModule' },
  { path: '', loadChildren: '../counter-demo/counter-demo.module#CounterDemoModule' },
  { path: '', loadChildren: '../datepicker-demo/datepicker-demo.module#DatepickerDemoModule' },
  { path: '', loadChildren: '../form-validator-demo/form-validator-demo.module#FormValidatorDemoModule' },
  { path: '', loadChildren: '../order-management/order-management.module#OrderManagementModule' },
  { path: '', loadChildren: '../file-upload-demo/file-upload.module#FileUploadModule' },
  { path: '', loadChildren: '../file-upload-oss-demo/file-upload-oss-demo.module#FileUploadOssDemoModule' },
  {
    path: '',
    loadChildren: '../vehicle-selection-demo/vehicle-management-demo.module#VehicleManagementDemoModule'
  },
  { path: '', loadChildren: '../tabs-demo/tabs-demo.module#TabsDemoModule' },
  { path: '', loadChildren: '../chart-demo/chart-demo.module#ChartDemoModule' },
  { path: '', loadChildren: '../button-demo/button-demo.module#ButtonDemoModule' },
  // { path: '', loadChildren: '../contact-us/contact-us.module#ContactUsModule' },
  // { path: '', loadChildren: '../terms/terms.module#TermsModule' },
  // { path: '', loadChildren: '../privacy/privacy.module#PrivacyModule' },
  // { path: '', loadChildren: '../help/help.module#HelpModule' },
  // { path: '', loadChildren: '../order-management/order-management.module#OrderManagementModule' },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CoreRoutingModule { }

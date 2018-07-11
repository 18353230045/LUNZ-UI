import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

const routes: Routes = RouteExtensions.withShell([
    { path: '', loadChildren: '../home/home.module#HomeModule' },
    { path: '', loadChildren: '../about/about.module#AboutModule' },
    { path: '', loadChildren: '../contact-us/contact-us.module#ContactUsModule' },
    { path: '', loadChildren: '../terms/terms.module#TermsModule' },
    { path: '', loadChildren: '../privacy/privacy.module#PrivacyModule' },
    { path: '', loadChildren: '../help/help.module#HelpModule' },
    { path: '', loadChildren: '../order-management/order-management.module#OrderManagementModule' },
    { path: '', loadChildren: '../messages/web-message.module#WebMessageModule' },
    // { path: '', loadChildren: '../ngx-bootstrap/ngx-bootstrap.module#NgxBootstrapModule' },
    { path: '', loadChildren: '../form-validator-demo/form-validator-demo.module#FormValidatorDemoModule' },
    {
        path: '',
        loadChildren: '../vehicle-selection-demo/vehicle-management-demo.module#VehicleManagementDemoModule'
    },
    { path: '', loadChildren: '../file-upload-demo/file-upload.module#FileUploadModule' },
    { path: '', loadChildren: '../chart-demo/chart-demo.module#ChartDemoModule' },
    { path: '', loadChildren: '../dropdown-demo/dropdown-demo.module#DropdownDemoModule' },
    { path: '', loadChildren: '../treeview-demo/treeview-demo.module#TreeviewDemoModule' },
    {
        path: '',
        loadChildren: '../select-selection-demo/select-selection-demo.module#SelectSelectionDemoModule'
    },
    { path: '', loadChildren: '../datepicker-demo/datepicker-demo.module#DatepickerDemoModule' },
    { path: '', loadChildren: '../tabs-demo/tabs-demo.module#TabsDemoModule' },
    { path: '', loadChildren: '../form-demo/form-demo.module#FormDemoModule' },
    { path: '', loadChildren: '../select2-demo/select2-demo.module#Select2DemoModule' },
    { path: '', loadChildren: '../progress-demo/progress-demo.module#ProgressDemoModule' },
    { path: '', loadChildren: '../hear-from/hear-from.module#HearFromModule' },
    { path: '', loadChildren: '../order/order.module#OrderModule' },
    { path: '', loadChildren: '../file-upload-oss-demo/file-upload-oss-demo.module#FileUploadOssDemoModule' },
    { path: '', loadChildren: '../button-demo/button-demo.module#ButtonDemoModule' },
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CoreRoutingModule { };

import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

const routes: Routes = RouteExtensions.withShell([
    { path: '', loadChildren: '../home/home.module#HomeModule' },
    { path: 'about', loadChildren: '../about/about.module#AboutModule' },
    { path: 'contact-us', loadChildren: '../contact-us/contact-us.module#ContactUsModule' },
    { path: 'terms', loadChildren: '../terms/terms.module#TermsModule' },
    { path: 'privacy', loadChildren: '../privacy/privacy.module#PrivacyModule' },
    { path: 'help', loadChildren: '../help/help.module#HelpModule' },
    { path: 'orders', loadChildren: '../order-management/order-management.module#OrderManagementModule' },
    { path: 'messages/:unreadmsgid', loadChildren: '../messages/web-message.module#WebMessageModule' },
    // { path: '', loadChildren: '../ngx-bootstrap/ngx-bootstrap.module#NgxBootstrapModule' },
    { path: 'validator', loadChildren: '../form-validator-demo/form-validator-demo.module#FormValidatorDemoModule' },
    {
        path: 'vehicle-select',
        loadChildren: '../vehicle-selection-demo/vehicle-management-demo.module#VehicleManagementDemoModule'
    },
    { path: 'upload', loadChildren: '../file-upload-demo/file-upload.module#FileUploadModule' },
    { path: 'chart', loadChildren: '../chart-demo/chart-demo.module#ChartDemoModule' },
    { path: 'dropdown', loadChildren: '../dropdown-demo/dropdown-demo.module#DropdownDemoModule' },
    { path: 'treeview', loadChildren: '../treeview-demo/treeview-demo.module#TreeviewDemoModule' },
    {
        path: 'selected',
        loadChildren: '../select-selection-demo/select-selection-demo.module#SelectSelectionDemoModule'
    },
    { path: 'datepicker', loadChildren: '../datepicker-demo/datepicker-demo.module#DatepickerDemoModule' },
    { path: 'tabs', loadChildren: '../tabs-demo/tabs-demo.module#TabsDemoModule' },
    { path: 'form', loadChildren: '../form-demo/form-demo.module#FormDemoModule' },
    { path: 'select2', loadChildren: '../select2-demo/select2-demo.module#Select2DemoModule' },
    { path: 'progress', loadChildren: '../progress-demo/progress-demo.module#ProgressDemoModule' },
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CoreRoutingModule { };

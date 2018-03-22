import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlertOptions, SweetAlertType } from 'sweetalert2';

import { FileUploaderModule } from '../lib/ngx-file-uploader/public_api';

import { environment } from '../../environments/environment';

import { LoaderComponent } from './loader/loader.component';
import { HostComponent } from './components/host.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgxDatatableFooterComponent } from './components/ngx-datatable-footer/ngx-datatable-footer.component';
import { NgxDatatablePagerComponent } from './components/ngx-datatable-pager/ngx-datatable-pager.component';
import { NgxDatatableActionsComponent } from './components/ngx-datatable-actions/ngx-datatable-actions.component';
import { NgxQueryToolbarComponent } from './components/ngx-query-toolbar/ngx-query-toolbar.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { DropdownSelectionComponent } from './components/dropdown-selection/dropdown-selection.component';
import { SelectSelectionComponent } from './components/select-selection/select-selection.component';

import { swalDefaultsProvider } from './dialogs/sweetalert2.providers';

import { ConvertService } from './converts/convert.service';
import { SharedSessionStorageService } from './services/shared-session-storage.service';
import { VehicleService } from './services/vehicle.service';

import { NgxDataTableDirective } from './directives/ngx-datatable.directive';
import { ApplyPermissionDirective } from './directives/apply-permission.directive';
import { BsDateValueDirective } from './directives/bs-date-value.directive';
import { LaddaDirective } from './directives/ladda.directive';

import { RmbPipe } from './pipes/rmb.pipe';


export function createDecimalPipe() {
    return new DecimalPipe(environment.localeId);
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxDatatableModule,
        FileUploaderModule,
        FormsModule
    ],

    declarations: [
        LoaderComponent,
        HostComponent,
        NgxDataTableDirective,
        ApplyPermissionDirective,
        ValidationMessageComponent,
        FileUploadComponent,
        NgxDatatableFooterComponent,
        NgxDatatablePagerComponent,
        NgxDatatableActionsComponent,
        RmbPipe,
        BsDateValueDirective,
        LaddaDirective,
        NgxQueryToolbarComponent,
        VehicleSelectionComponent,
        DropdownSelectionComponent,
        SelectSelectionComponent
    ],

    exports: [
        LoaderComponent,
        HostComponent,
        ValidationMessageComponent,
        DropdownSelectionComponent,
        FileUploadComponent,
        NgxDatatableFooterComponent,
        NgxDatatablePagerComponent,
        NgxDatatableActionsComponent,
        NgxQueryToolbarComponent,
        VehicleSelectionComponent,
        SelectSelectionComponent,
        NgxDataTableDirective,
        ApplyPermissionDirective,
        BsDateValueDirective,
        RmbPipe,
        LaddaDirective
    ],

    providers: [
        ConvertService,
        SharedSessionStorageService,
        VehicleService
    ]
})

export class SharedModule {
    public static forRoot(defaultSwalOptions?: SweetAlertOptions): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: DecimalPipe,
                    deps: [],
                    useFactory: createDecimalPipe
                },
                swalDefaultsProvider(defaultSwalOptions)
            ]
        };
    };
};

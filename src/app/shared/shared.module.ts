import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlertOptions } from 'sweetalert2';
import { FileUploaderModule } from '../../app/lib/@uniprank/ng2-file-uploader';

import { environment } from '../../environments/environment';

import { LoaderComponent } from './loader/loader.component';
import { HostComponent } from './components/host.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
// import { NgxDatatableFooterComponent } from './components/ngx-datatable-footer/ngx-datatable-footer.component';
// import { NgxDatatablePagerComponent } from './components/ngx-datatable-pager/ngx-datatable-pager.component';
// import { NgxDatatableActionsComponent } from './components/ngx-datatable-actions/ngx-datatable-actions.component';
// import { ZrButtonComponent } from './components/zr-button/zr-button.component';
// import { ZrSwitchComponent } from './components/zr-switch/zr-switch.component';
// import { ZrTagComponent } from './components/zr-tag/zr-tag.component';
// import { ZrCounterComponent } from './components/zr-counter/zr-counter.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { FileUploadOssComponent } from './components/file-upload-oss/file-upload-oss.component';

import { swalDefaultsProvider } from './dialogs/sweetalert2.providers';

import { ConvertService } from './converts/convert.service';
import { SharedSessionStorageService } from './services/shared-session-storage.service';
import { VehicleService } from './services/vehicle.service';
import { ReferenceDataService } from './services/reference-data.service';

import { NgxDataTableDirective } from './directives/ngx-datatable.directive';
import { ApplyPermissionDirective } from './directives/apply-permission.directive';
import { LaddaDirective } from './directives/ladda.directive';
// import { DatepickerDirective } from './directives/datepicker.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';

import { RmbPipe } from './pipes/rmb.pipe';
import { RemoveSpacePipe } from './pipes/remove-space.pipe';
import { ToFixedPipe } from './pipes/to-fixed.pipe';

export function createDecimalPipe() {
    return new DecimalPipe(environment.localeId);
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxDatatableModule,
        FileUploaderModule,
        FormsModule,
        ReactiveFormsModule
    ],

    declarations: [
        LoaderComponent,
        HostComponent,
        FileUploadComponent,
        // NgxDatatableFooterComponent,
        // NgxDatatablePagerComponent,
        // NgxDatatableActionsComponent,
        // ZrButtonComponent,
        // ZrSwitchComponent,
        // ZrTagComponent,
        // ZrCounterComponent,
        VehicleSelectionComponent,
        FileUploadOssComponent,

        NgxDataTableDirective,
        ApplyPermissionDirective,
        LaddaDirective,
        // DatepickerDirective,
        AutoFocusDirective,

        RmbPipe,
        RemoveSpacePipe,
        ToFixedPipe,
    ],
    exports: [
        LoaderComponent,
        HostComponent,
        FileUploadComponent,
        // NgxDatatableFooterComponent,
        // NgxDatatablePagerComponent,
        // NgxDatatableActionsComponent,
        // ZrButtonComponent,
        // ZrSwitchComponent,
        // ZrTagComponent,
        // ZrCounterComponent,
        VehicleSelectionComponent,
        FileUploadOssComponent,

        NgxDataTableDirective,
        ApplyPermissionDirective,
        LaddaDirective,
        // DatepickerDirective,
        AutoFocusDirective,

        RmbPipe,
        ToFixedPipe
    ],

    providers: [
        ConvertService,
        SharedSessionStorageService,
        VehicleService,
        ReferenceDataService
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

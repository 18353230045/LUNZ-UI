import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlertOptions } from 'sweetalert2';
import { ThirdPartyModule } from './third-party.module';

import {
  HostComponent, FileUploadOssComponent, VehicleSelectionComponent, swalDefaultsProvider,
  RemoveSpacePipe, RmbPipe, ToFixedPipe, DomSanitizerPipe, LaddaDirective, NgxDataTableDirective,
  AutoFocusDirective, ApplyPermissionDirective
} from '@app/shared';

import { environment } from '@env/environment';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

export function createDecimalPipe() {
  return new DecimalPipe(environment.localeId);
}

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ThirdPartyModule,
    ReactiveFormsModule
  ],
  declarations: [
    RmbPipe,
    ToFixedPipe,
    LaddaDirective,
    RemoveSpacePipe,
    DomSanitizerPipe,

    AutoFocusDirective,
    NgxDataTableDirective,
    ApplyPermissionDirective,

    HostComponent,
    FileUploadOssComponent,
    VehicleSelectionComponent
  ],
  exports: [
    RmbPipe,
    ToFixedPipe,
    RemoveSpacePipe,
    DomSanitizerPipe,

    LaddaDirective,
    AutoFocusDirective,
    NgxDataTableDirective,
    ApplyPermissionDirective,

    HostComponent,
    FileUploadOssComponent,
    VehicleSelectionComponent,

    ThirdPartyModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [createBsDatepickerConfigProvider()]
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
  }
}

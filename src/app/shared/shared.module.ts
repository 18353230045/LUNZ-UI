import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  HostComponent, FileUploadOssComponent, VehicleSelectionComponent, swalDefaultsProvider,
  RemoveSpacePipe, RmbPipe, ToFixedPipe, DomSanitizerPipe, LaddaDirective, NgxDataTableDirective,
  AutoFocusDirective
} from '@app/shared';
import { SweetAlertOptions } from 'sweetalert2';
import { ThirdPartyModule } from './third-party.module';
import { createBsDatepickerConfigProvider } from '../utils/bs-datepicker-config';

import { environment } from '@env/environment';

export function createDecimalPipe() {
  return new DecimalPipe(environment.localeId);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ThirdPartyModule,
  ],
  declarations: [
    HostComponent,
    FileUploadOssComponent,
    VehicleSelectionComponent,
    RmbPipe,
    ToFixedPipe,
    RemoveSpacePipe,
    DomSanitizerPipe,
    LaddaDirective,
    AutoFocusDirective,
    NgxDataTableDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    ThirdPartyModule,
    HostComponent,
    FileUploadOssComponent,
    VehicleSelectionComponent,
    RmbPipe,
    ToFixedPipe,
    RemoveSpacePipe,
    DomSanitizerPipe,
    LaddaDirective,
    AutoFocusDirective,
    NgxDataTableDirective
  ],
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

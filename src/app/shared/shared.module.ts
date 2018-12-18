import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  HostComponent, FileUploadOssComponent, VehicleSelectionComponent, swalDefaultsProvider,
  RemoveSpacePipe, RmbPipe, ToFixedPipe, LaddaDirective, NgxDataTableDirective
} from '@app/shared';
import { SweetAlertOptions } from 'sweetalert2';

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
  ],
  declarations: [
    HostComponent,
    FileUploadOssComponent,
    VehicleSelectionComponent,
    RmbPipe,
    RemoveSpacePipe,
    ToFixedPipe,
    LaddaDirective,
    NgxDataTableDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    HostComponent,
    FileUploadOssComponent,
    VehicleSelectionComponent,
    RmbPipe,
    LaddaDirective,
    NgxDataTableDirective
  ],
  providers: []
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

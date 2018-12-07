import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HostComponent, SharedSessionStorageService } from '@app/shared';
import { SweetAlertOptions } from 'sweetalert2';

import { environment } from '@env/environment';
import {
  swalDefaultsProvider, ConvertService, ReferenceDataService,
  RemoveSpacePipe, RmbPipe, ToFixedPipe, LaddaDirective, NgxDataTableDirective
} from '@app/shared';

export function createDecimalPipe() {
  return new DecimalPipe(environment.localeId);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HostComponent,
    RmbPipe,
    RemoveSpacePipe,
    ToFixedPipe,
    LaddaDirective,
    NgxDataTableDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    HostComponent,
    LaddaDirective,
    NgxDataTableDirective
  ],
  providers: [
    SharedSessionStorageService,
    ConvertService,
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
  }
}

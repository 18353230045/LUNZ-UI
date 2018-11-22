import { InjectionToken, Provider } from '@angular/core';

import { SweetAlertOptions } from 'sweetalert2';

export const SWAL_DEFAULTS = new InjectionToken('SWAL_DEFAULTS');

export function swalDefaultsProvider(options: SweetAlertOptions = {}): Provider {
    return {
        provide: SWAL_DEFAULTS,
        useValue: options
    };
}

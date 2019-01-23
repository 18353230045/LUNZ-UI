import { NgModule } from '@angular/core';

import { ZrTagModule } from 'zr-tag';
import { ZrTabsModule } from 'zr-tabs';
import { NgxTrimModule } from 'ngx-trim';
import { SelectModule } from 'ng-select';
import { ZrBadgeModule } from 'zr-badge';
import { ZrStepsModule } from 'zr-steps';
import { ZrButtonModule } from 'zr-button';
import { ZrSwitchModule } from 'zr-switch';
import { ModalModule } from 'ngx-bootstrap';
import { ZrCounterModule } from 'zr-counter';
import { ZrProgressModule } from 'zr-progress';
import { ZrDatepickerModule } from 'zr-datepicker';
import { NgxQueryToolbarModule } from 'ngx-query-toolbar';
import { NgxQueryModule } from '@zhongruigroup/ngx-query';
import { MomentModule } from 'angular2-moment/moment.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ZrSelectSelectionModule } from 'zr-select-selection';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDatatableFooterModule } from 'ngx-datatable-footer';
import { NgxDatatableActionsModule } from 'ngx-datatable-actions';
import { ZrValidationMessageModule } from 'zr-validation-message';

@NgModule({
  imports: [
    ModalModule.forRoot()
  ],
  exports: [
    ZrTagModule,
    ZrTabsModule,
    MomentModule,
    SelectModule,
    NgxTrimModule,
    ZrBadgeModule,
    ZrStepsModule,
    ZrButtonModule,
    ZrSwitchModule,
    NgxQueryModule,
    ZrCounterModule,
    ZrProgressModule,
    NgxDatatableModule,
    ZrDatepickerModule,
    BsDatepickerModule,
    NgxQueryToolbarModule,
    ZrSelectSelectionModule,
    NgxDatatableFooterModule,
    NgxDatatableActionsModule,
    ZrValidationMessageModule
  ]
})
export class ThirdPartyModule { }

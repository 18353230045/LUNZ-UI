import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'primeng/shared';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';

import { FileUpload } from './fileupload.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    ProgressBarModule,
    MessagesModule
  ],
  declarations: [FileUpload],
  exports: [FileUpload]
})
export class FileUploadModule { }

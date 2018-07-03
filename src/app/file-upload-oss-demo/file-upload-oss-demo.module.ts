import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FileUploadOssRoutingModule } from './file-upload-oss-routing.module';

import { FileUploadOssDemoComponent } from './partial/file-upload-oss-demo/file-upload-oss-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FileUploadOssRoutingModule
  ],
  declarations: [
    FileUploadOssDemoComponent,
    UsingDocumentsComponent
  ]

})
export class FileUploadOssDemoModule { }

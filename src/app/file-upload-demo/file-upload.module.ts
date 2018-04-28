import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FileUploadRoutingModule } from './file-upload-routing.module';

import { FileUploadDemoComponent } from './partial/file-upload-demo/file-upload-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FileUploadRoutingModule,
    ],

    declarations: [
        FileUploadDemoComponent,
        UsingDocumentsComponent
    ]
})

export class FileUploadModule { }

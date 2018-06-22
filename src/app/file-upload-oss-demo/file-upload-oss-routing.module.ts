import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { FileUploadOssDemoComponent } from './partial/file-upload-oss-demo/file-upload-oss-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'upload-oss', component: FileUploadOssDemoComponent, data: { title: '上传文件到OSS' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '上传文件到OSS使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class FileUploadOssRoutingModule { }

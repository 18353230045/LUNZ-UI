import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeModule } from 'primeng';

import { SharedModule } from 'app/shared/shared.module';
import { TreeviewDemoRoutingModule } from './treeview-demo-routing.module';

import { TreeviewDemoComponent } from './partial/treeview-demo/treeview-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

import { TreeviewDemoService } from './shared/treeview-demo.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TreeModule,
        TreeviewDemoRoutingModule
    ],

    declarations: [
        TreeviewDemoComponent,
        UsingDocumentsComponent
    ],

    providers: [
        TreeviewDemoService
    ]
})

export class TreeviewDemoModule { }

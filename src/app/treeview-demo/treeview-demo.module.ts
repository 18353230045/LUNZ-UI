import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeModule, ContextMenuModule, DragDropModule } from 'primeng';
import { ZrValidationMessageModule } from 'zr-validation-message';

import { SharedModule } from 'app/shared/shared.module';
import { TreeviewDemoRoutingModule } from './treeview-demo-routing.module';

import { TreeviewDemoComponent } from './partial/treeview-demo/treeview-demo.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

import { TreeviewDemoService } from './shared/treeview-demo.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TreeModule,
        ContextMenuModule,
        DragDropModule,
        ZrValidationMessageModule,
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

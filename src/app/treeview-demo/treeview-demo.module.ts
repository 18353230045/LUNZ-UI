import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';
import { TreeModule, ContextMenuModule, DragDropModule } from 'primeng';
import { ZrValidationMessageModule } from 'zr-validation-message';

import { SharedModule } from 'app/shared/shared.module';
import { TreeviewDemoRoutingModule } from './treeview-demo-routing.module';

import { TreeviewDemoComponent } from './partial/treeview-demo/treeview-demo.component';
import { EditNodeModalComponent } from './partial/edit-node-modal/edit-node-modal.component';
import { CreateNodeModalComponent } from './partial/create-node-modal/create-node-modal.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

import { TreeDragDropService } from 'primeng';
import { TreeviewDemoService } from './shared/treeview-demo.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ModalModule.forRoot(),
        TreeModule,
        ContextMenuModule,
        DragDropModule,
        ZrValidationMessageModule,
        TreeviewDemoRoutingModule
    ],

    declarations: [
        TreeviewDemoComponent,
        CreateNodeModalComponent,
        EditNodeModalComponent,
        UsingDocumentsComponent
    ],

    entryComponents: [
        CreateNodeModalComponent,
        EditNodeModalComponent
    ],

    providers: [
        TreeDragDropService,
        TreeviewDemoService
    ]
})

export class TreeviewDemoModule { }

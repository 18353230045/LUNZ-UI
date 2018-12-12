import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DragDropModule } from 'primeng/dragdrop';

import { ZrValidationMessageModule } from 'zr-validation-message';

import { SharedModule } from 'app/shared/shared.module';
import { TreeviewDemoRoutingModule } from './treeview-demo-routing.module';

import { TreeviewDemoComponent } from './partial/treeview-demo/treeview-demo.component';
import { EditNodeModalComponent } from './partial/edit-node-modal/edit-node-modal.component';
import { CreateNodeModalComponent } from './partial/create-node-modal/create-node-modal.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

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

  providers: []
})

export class TreeviewDemoModule { }

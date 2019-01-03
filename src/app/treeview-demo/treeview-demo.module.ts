import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeDragDropService } from 'primeng/api';

import { SharedModule } from 'app/shared/shared.module';
import { TreeviewDemoRoutingModule } from './treeview-demo-routing.module';

import { TreeviewDemoComponent } from './partial/treeview-demo/treeview-demo.component';
import { EditNodeModalComponent } from './partial/edit-node-modal/edit-node-modal.component';
import { CreateNodeModalComponent } from './partial/create-node-modal/create-node-modal.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

@NgModule({
  imports: [
    TreeModule,
    FormsModule,
    CommonModule,
    SharedModule,
    DragDropModule,
    ContextMenuModule,
    ReactiveFormsModule,
    TreeviewDemoRoutingModule
  ],
  declarations: [
    TreeviewDemoComponent,
    EditNodeModalComponent,
    UsingDocumentsComponent,
    CreateNodeModalComponent,
  ],
  entryComponents: [
    EditNodeModalComponent,
    CreateNodeModalComponent
  ],
  providers: [TreeDragDropService]
})

export class TreeviewDemoModule { }

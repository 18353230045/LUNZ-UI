import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { CardComponent } from './partial/card-demo/card.component';
import { UsingDocumentsComponent } from './partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'card', component: CardComponent, data: { title: 'card卡片' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: 'card卡片使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CardDemoRoutingModule { }

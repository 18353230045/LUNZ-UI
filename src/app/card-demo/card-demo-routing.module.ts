import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { CardComponent } from './partial/card-demo/card.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'card', component: CardComponent, data: { title: 'card卡片' } },
        []);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CardDemoRoutingModule { }

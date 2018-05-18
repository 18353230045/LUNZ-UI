import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteExtensions } from '../core/route.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component: HomeComponent, data: { title: '组件库', breadcrumb: false } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class HomeRoutingModule { }

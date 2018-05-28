###说明
提供了自定查询界面组件，包括简单查询和复杂查询。

github地址： [https://github.com/xuemingfeng/ngx-query](https://github.com/xuemingfeng/ngx-query)

### 如何使用？简单用例
在模块.module.ts 引入 `NgxQueryModule` 

    import { Component, NgModule } from '@angular/core';
    import { NgxQueryModule } from 'ngx-query';

    @NgModule({
        imports: [
            NgxQueryModule.forRoot(ngxQuerySettings)
        ]
    })

    export class MyModule {}

在组件.component.ts 中

    import { Component, OnInit, ViewChild } from '@angular/core';
    import { QueryComponent } from 'ngx-query/query.component';

    @Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss']
    })

    export class MylistComponent {
        queryTemplates: any = [{
            name: 'Default',
            template: {
                op: 'or',
                rules: [
                    { field: 'subject', op: 'cn', data: '' },
                    { field: 'date', op: 'bt' }
                ],
                groups: []
            }
        }];
    }

在模板.html 中

    <div class="col-lg-12">
        <ngx-query #ngxQuery [title]="'订单管理'" [queryTemplates]="queryTemplates" [showModeButtons]="true">
            <ngx-query-field [name]="'subject'" [label]="'订单简要'" [type]="'string'"></ngx-query-field>
            <ngx-query-field name="date" label="日期" type="date"></ngx-query-field>
            <ng-template ngx-query-toolbar-template>
                <div class="btn-group btn-group-xs">
                    <a routerLink="./new" class="btn btn-primary"><i class="fa fa-plus"></i> 新建</a>
                </div>
            </ng-template>
        </ngx-query>
    </div>

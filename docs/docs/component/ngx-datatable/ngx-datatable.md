###说明
ngx-datatable提供数据列表显示功能，更详细文档：

[https://github.com/swimlane/ngx-datatable](https://github.com/swimlane/ngx-datatable)

[https://swimlane.gitbook.io/ngx-datatable/api](https://swimlane.gitbook.io/ngx-datatable/api)

[更多DEMO](http://swimlane.github.io/ngx-datatable/)

###如何使用？ 简单用例
在模块.module.ts中 引入

    import { NgxDatatableModule } from '@swimlane/ngx-datatable';
    import { NgxDataTableDirective } from './directives/ngx-datatable.directive';
    import { NgxDatatableFooterComponent } from './components/ngx-datatable-footer/ngx-datatable-footer.component';
    import { NgxDatatablePagerComponent } from './components/ngx-datatable-pager/ngx-datatable-pager.component';
    import { NgxDatatableActionsComponent } from './components/ngx-datatable-actions/ngx-datatable-actions.component';

    @NgModule({

    imports: [
        NgxDatatableModule
    ], 
    
    declarations: [
        NgxDataTableDirective,
        NgxDatatableFooterComponent,
        NgxDatatablePagerComponent,
        NgxDatatableActionsComponent
    ]

    export class MyModule {}

在组件.component.ts中定义

    export class OrdersComponent implements OnInit {
        orders: Array<any>;  
        private datatable: any; 
    }

在组件.html中

    <div class="col-lg-12">
        <ngx-datatable #dt class="material" [scrollbarH]="true" [rows]="orders" [loadingIndicator]="loading" 
                appNgxDataTable [ngxQuery]="ngxQuery" (data)="loadOrders($event)">
            <app-ngx-datatable-footer></app-ngx-datatable-footer>
            <ngx-datatable-column name="摘要" width="120" prop="subject"> </ngx-datatable-column>
            <ngx-datatable-column name="日期" width="60" prop="date">
                <ng-template let-row="row" ngx-datatable-cell-template>
                    {{row.date | date}}
                </ng-template>
            </ngx-datatable-column>
            <ngx-datatable-column name="付款" width="40" prop="paid">
                <ng-template let-row="row" ngx-datatable-cell-template>
                    <span class="label" [ngClass]="{'label-primary': row.paid }">Paid</span>
                </ng-template>
            </ngx-datatable-column>
            <ngx-datatable-column maxWidth="200">
                <ng-template let-column="column" ngx-datatable-header-template>
                    <app-ngx-datatable-actions [datatable]="dt"></app-ngx-datatable-actions>
                </ng-template>
                <ng-template let-row="row" ngx-datatable-cell-template>
                    <div class="btn-group btn-group-xs">
                    <a [routerLink]="['./', row.id]" class="btn btn-default"><i class="fa fa-file-o"></i> 详细</a>
                    <a [routerLink]="['./', row.id,'edit']" class="btn btn-default"><i class="fa fa-edit"></i> 编辑</a>
                    <a (click)="delete(row)" class="btn btn-danger"><i class="fa fa-times"></i> 删除</a>
                    </div>
                </ng-template>
            </ngx-datatable-column>
            </ngx-datatable>
    </div>

### 功能列表

自定义指令或组件               | 说明
------------------------------|-------------------------------
appNgxDataTable               | 初始化 datatable
app-ngx-datatable-footer      | 实现 datatable 表尾显示
app-ngx-datatable-pager       | 实现 datatable 分页功能
app-ngx-datatable-actions     | 按钮下拉框，下拉列表显示 datatable 的所有列名，实现列显示/隐藏，以及列是否固定左侧的功能

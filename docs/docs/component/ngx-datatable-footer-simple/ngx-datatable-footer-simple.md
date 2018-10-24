###安装插件
`npm install --save ngx-datatable-footer-simple` （或确认node-modules里面有此插件）

###引入NgxDatatableFooterSimpleModule
在当前模块的.module.ts中引入

    import { NgxDatatableFooterSimpleModule } from 'ngx-datatable-footer-simple';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            NgxDatatableFooterSimpleModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

      <ngx-datatable-footer-simple [datatable]="datatable" [count]="count" (display)="showCount()"></ngx-datatable-footer-simple>

###组件TS里面
component.ts中，定义count变量和获取count数据的方法，如：

    export class component implements OnInit { 
        datatable:any;
        count:number | undefined;

        ngOnInit() {

        };

        // 请求列表总数据，赋值给count
        showCount() {
            this.count = count;
        };
    };
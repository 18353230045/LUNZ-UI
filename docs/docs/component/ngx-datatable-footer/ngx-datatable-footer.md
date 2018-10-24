###安装插件
`npm install --save ngx-datatable-footer` （或确认node-modules里面有此插件）

###引入NgxDatatableFooterModule
在当前模块的.module.ts中引入

    import { NgxDatatableFooterModule } from 'ngx-datatable-footer';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            NgxDatatableFooterModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

      <ngx-datatable-footer [datatable]="datatable"></ngx-datatable-footer>

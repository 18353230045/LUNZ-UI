###引入SharedModule
在当前模块的.module.ts中引入

    import { SharedModule } from '../shared/shared.module';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            SharedModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <app-file-upload [multiple]="true" [accept]="'image/*'" (success)="successHandle($event)" (error)="errorHandle($event)"</app-file-upload>

###定义接收上传和失败时事件

    export class FileUploadDemoComponent implements OnInit {
        log: Logger;

        constructor(
            private loggerFactory: LoggerFactory
        ) {
            this.log = this.loggerFactory.getLogger();
        };

        ngOnInit() {

        };

        // 上传成功事件
        successHandle(event: any) {
            this.log.debug(event);
            // do something
        };

        // 上传失败事件
        errorHandle(error: any) {
            this.log.debug(event);
            // do something
        };
    };

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
multiple | 可选，设置单文件/多文件上传 | boolean | true,false | false
accept | 可选，设置上传文件类型	 | string | input标签accept属性对应的属性值， 如：application/msexcel、application/msword、 application/pdf、image/jpeg、image/png、video/x-msvideo等等 | *（不限制）
success | 可选，上传成功时的事件 | — | — | -
error | 可选，上传失败时的事件 | — | — | -
ngValue | 可选，上传成功时传出的数据 | any | — | -
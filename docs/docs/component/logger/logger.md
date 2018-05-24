###说明
> logger提供信息提示服务

###如何使用？

> 在的 组件.component.ts 中引入 `Logger` 和 `LoggerFactory` 服务

    import { Logger } from '../../core/logger.service';
    import { LoggerFactory } from '../../core/logger-factory.service';

    @Component({
        selector: 'app-my-com',
        templateUrl: './my.component.html',
        styleUrls: ['./my.component.scss']
    })

    export class MyComponent implements OnInit {

        log: Logger;

        constructor(
            private loggerFactory: LoggerFactory) {
                this.log = this.loggerFactory.getLogger();
            }

        ngOnInit() {}
    }

###简单用例

    this.log.info('Success!');

### 功能列表

方法                           | 说明
-------------------------------|---------------------------------------------
debug                         | 程序调试，在控制台打印处信息，替代原生console.log().
info                          | 弹出提示信息.
warn                          | 弹出警告信息.
error                         | 弹出错误信息.
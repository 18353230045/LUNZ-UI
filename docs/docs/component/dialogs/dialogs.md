###说明
dialogs 是一个对话框组件集合，使用了 [ngx-toastr](https://github.com/scttcper/ngx-toastr) 和 [ngsweetalert2](https://github.com/toverux/ngsweetalert2) 两个组件。
###如何使用？
> model中引用'Dialogs'服务

        import { Dialogs } from '../core/dialogs.service';

        @Component({
          selector: 'app-my-com',
          templateUrl: './my.component.html',
          styleUrls: ['./my.component.scss']
        })

        export class MyComponent implements OnInit {

            constructor(private dialogs: Dialogs) {}

            ngOnInit() {}
        }

###简单用例
> 组件中.component.ts

    this.dialogs.alert('This is a test.', 'Title');

###功能列表

方法|说明
-|-
success | 成功提示框
info | 信息提示框
warning | 警告提示框
error | 错误提示框
alert | 信息弹出框
confirm | 问题询问框
wait | 等待提示框
###说明
[angular2-ladda](https://github.com/moff/angular2-ladda) 组件提供了按钮处理中状态服务。
###如何使用？简单用例
ladda已集成指令在core模块中已经引入，无需再次引入。

组件html中，button按钮添加ladda指令：

    <button type="button" class="btn btn-sm" [ladda]="saving">保存</button>

组件ts中：

    export class EditOrderComponent implements OnInit {
        saving = false;   // saving为true时启用状态，false时关闭状态
    }

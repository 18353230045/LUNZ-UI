###创建shared目录
右键 `order-management` 文件夹，新建文件夹 `shared`
###打开命令行终端
右键 `shared` 目录选择 ‘在终端中打开’，输入命令 `ng g s Orders`,创建 OrdersService
###填充服务器通信方法
打开 `orders.service.ts` 文件，填充服务器通信方法，详细参见文件 `orders.service.ts`
###添加到模块中
打开 `order-management.module.ts` 文件，将`OrdersService` 引入到OrderManagementModule中，并添加到providers中，详细参见文件 `order-management.module.ts`
###添加到组件中
在组件中引入，并作为构造行数的参数传入，例：

`import { OrdersService } from '../../shared/orders.service';`

    export class OrdersComponent implements OnInit, AfterViewInit {
        
        constructor(private ordersService: OrdersService,) {

        };
    };
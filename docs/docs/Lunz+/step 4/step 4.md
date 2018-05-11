###新建partial目录
> 右键 `order-management` 文件夹，新建文件夹 `partial`

###打开命令行终端
> 右键 partial 选择 ‘在终端中打开’，输入命令 `ng g c orders`, 创建 ‘orders.component.ts’ 组件

###引入依赖，填充业务逻辑
> 打开 orders.component.ts 文件，引入组件需要的服务、指令、管道、组件等，业务逻辑写在class类中,详细参见文件 orders.component.ts

###添加查询组件
> 将 ngx-query 引入到 create-order.component.html，并在 orders.component.ts 中对其进行配置，详见orders.component.ts文件

###添加表格组件ngx-datatable
> 将 ngx-datatable 引入到 create-order.component.html，并在 create-order.component.html 中对其进行配置，详见create-order.component.html文件

###获取数据
> 在 loadOrders() 方法中，调用 ordersService.getOrders() 从服务器获取数据,详见orders.component.ts文件
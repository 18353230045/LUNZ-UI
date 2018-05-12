###打开命令行终端
> 选择 ‘src/app’目录，右键选择 ‘在终端中打开’,此时会打开Vscode自带的命令行终端
###创建模块
> 使用 `ng g m order-management ` 命令创建 订单管理模块 (order-management.module.ts)
###引入依赖
> 在order-management.module.ts文件中，引入与业务相关的模块、组件、指令、管道等 （注意：需要将 `SharedModule` 引入到这个 Module 中）
###配置路由
> 配置路由，右键 `order-management` 文件夹，新建文件 `order-management-routing.module.ts`，在 ‘order-management-routing.module.ts’ 中配置路由，详细参见文件 `order-management-routing.module.ts`并将 ‘OrderManagementRoutingModule’  引入到 ‘OrderManagementModule’ 中；打开 `src\app\core\core-routing.module.ts` 文件，将OrderManagementModule 配置到路由中，详细参见文件 ` core-routing.module.ts `。

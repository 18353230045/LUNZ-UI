提示：Angular路由是大小写敏感的，使用时注意大小写。

## 具有框架的路由配置
具有框架的界面是指具有导航栏的界面，即登录后的界面。

1. 在 xxx-routing.module.ts 中配置路由，参见 order-management-routing.module.ts
2. 将 XxxRoutingModule 引用到 XxxModule，参见 order-management.module.ts 
3. 将路由配置添加到 src\app\core\core-routing.module.ts，参见此文件。

## 无框架的路由配置
无框架的界面是指没有导航栏的界面，如登录页面。

无框架的路由配置与具有框架的路由配置一致，更接近 Angular 原生路由配置规则。

1. 在 xxx-routing.module.ts 中配置路由，参见 order-management-routing.module.ts
2. 将 XxxRoutingModule 引用到 XxxModule，参见 order-management.module.ts 
3. 将 当前模块引入到 'app.module.ts' 中，添加到元数据@NgModule()imports：[]} 节点下。
    
    注意：一定放在 'AppRoutingModule' 前面。

路由的层级关系，同时也会用在 Breadcrumbs，所以，定义路由时，需要考虑这些。
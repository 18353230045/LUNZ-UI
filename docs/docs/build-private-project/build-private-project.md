###一、 获取LUNZ+框架源码，更改配置信息
1. 从github获取LUNZ+框架源码，地址：[https://github.com/ZhongruiGroup/LUNZ-UI](https://github.com/ZhongruiGroup/LUNZ-UI)
2. 用VScode打开项目LUNZ+框架
3. 更改项目名称

    一处：项目根文件夹

    二处：'.angular-cli.json' 文件下'project/name'属性

    三处：'package.json' 文件下'name'属性

    四处：'src/index.html' 下面的 'title' 标签

4. 更改仓库地址和版本

    位于package.json文件'repository'下的'url'节点，修改即可。'bugs'节点和'homepage'节点可改可移除【注：此处并非设置项目存放的git仓库】

    版本位于package.json文件下的'version'节点，修改即可

5. 修改环境变量

    环境变量位于'src/environments'目录下，共三个文件，分别为'environment.ts'开发环境使用，'environment.stage.ts'测试环境使用，'environment.prod.ts'正式环境使用

###二、 删除非私有项目模块
1. 项目下面的模块全部位于'src/app'目录下面，保留'about'、'authentication'、'change-password'、'contact-us'、'lib'、'privacy'、'shared'、'sso'、'terms'、'utils'，'app-routing.module.ts'，'app.component.html'，'app.component.scss'，'app.component.ts'，'app.module.ts'其余删掉。

2. 删掉 'src/app/core/core.module.ts' 文件下面的

    `import { OrdersService } from '../order-management/shared/orders.service';`

    `import { EditOrderModalComponent } from '../order-management/partial/edit-order-modal/edit-order-modal.component';`

    @NgModule({
        declarations: [
            EditOrderModalComponent
        ],
        entryComponents: [
            EditOrderModalComponent
        ],
        providers: [
            OrdersService
        ]
    })

3. 删掉 'src/app/core/core-routing.module.ts' 文件下面非私有项目的模块路由，以下部分保留

    `{ path: '', loadChildren: '../home/home.module#HomeModule' },`

    `{ path: 'about', loadChildren: '../about/about.module#AboutModule' },`

    `{ path: 'contact-us', loadChildren: '../contact-us/contact-us.module#ContactUsModule' },`
    
    `{ path: 'terms', loadChildren: '../terms/terms.module#TermsModule' },`

    `{ path: 'privacy', loadChildren: '../privacy/privacy.module#PrivacyModule' },`

    `{ path: 'help', loadChildren: '../help/help.module#HelpModule' },`

    `{ path: 'messages/:unreadmsgid', loadChildren: '../messages/web-message.module#WebMessageModule' },`

    `{ path: '', loadChildren: '../hear-from/hear-from.module#HearFromModule' },`

###三、 安装依赖，启动项目
1. 根目录下面运行 'npm install' 安装依赖
2. 运行 'npm start'
###四、 开始开发
1. 参照'开始LUNZ+'开发流程

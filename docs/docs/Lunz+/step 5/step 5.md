###创建新建订单组件
> 右键 partial 文件夹，选择在终端中打开,输入命令 `ng g c CreateOrder`，创建 '新建订单组件'

###创建订单编辑组件
> 右键 partial 文件夹，选择在终端中打开,输入命令 `ng g c EditOrder`，创建 '订单编辑组件'

###引入依赖，填充业务逻辑
> 打开 create-order.component.ts 文件，引入组件需要的服务、指令、管道、组件等，业务逻辑写在 class类中,详细参见文件 'create-order.component.ts'

###修改编辑订单组件
> 删除 create-order.component.html 和 create -order.component.scss 两个文件，CreateOrderComponent 使用 EditOrderComponent 同样的界面和样式

###修改新建订单组件
> 修改 CreateOrderComponent 类，将 templateUrl 和 styleUrls 两属性值指向 'edit-order' 文件夹

###定义表单验证规则
> 在 构造函数 中调用 buildForm() 方法，初始化表单；buildForm() 方法中定义字段数据效验的方法

###初始化订单实体
> 在 ngOnInit() 方法中，初始化 Order(订单) 实体

###保存数据
> 在 submit() 方法中，调用 OrdersService.createOrder() 方法保存数据到服务器

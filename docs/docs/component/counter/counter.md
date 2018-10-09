###安装插件
`npm install --save zr-counter` （或确认node-modules里面有此插件）

###引入ZrCounterModule
在当前模块的.module.ts中引入

    import { ZrCounterModule } from 'zr-counter';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrCounterModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <zr-counter [(value)]="value01"></zr-counter>

###传入数据源变量
component.ts中声明传入组件的数据源变量，如：

    export class CounterComponent implements OnInit { 
         value01: any = 1231;
    }; 

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
value | 必选，和计数器实现双向数据绑定 | any| — | -
showLeftIdentifier | 可选，显示左侧图标 | boolean | true,false | false
showRightIdentifier | 可选，显示右侧图标 | boolean | true,false | false
identifierLeft | 可选，左侧图标class类 | string | - | -
identifierRight | 可选，右侧图标class类 | string | - | -
identifierRight | 可选，右侧图标class类 | string | - | -
minValue | 可选，设置最小值 | number | - | -
maxValue | 可选，设置最大值 | number | - | -
integer | 可选，设置设置输出整数 | boolean | true,false | false
handler | 可选，弹出事件 | Eventer | - | -
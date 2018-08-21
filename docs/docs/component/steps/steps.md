###安装插件
`npm install --save zr-steps` （或确认node-modules里面有此插件）

###引入ZrStepsModule
在当前模块的.module.ts中引入

    import { ZrStepsModule } from 'zr-steps';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrStepsModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <zr-steps [steps]="steps" [stepActive]="1"></zr-steps>

###传入数据源变量
component.ts中声明传入组件的数据源变量，如：

    export class MyComponent implements OnInit { 
        ngOnInit() {
            this.steps = [
                { text: '步骤一',describe:'这是描述性文字' },
                { text: '步骤二' },
                { text: '步骤三' },
                { text: '步骤四' }
            ];
        }
    }; 

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
steps | 必选，步骤条项 | array | — | -
color | 可选，颜色 | string | — | #67c23a
stepActive | 激活第几步 | number | - | 0
icon | 可选 | string[] | 样式class类 | ['la la-check-circle'] (注：不同的图标，在数组中传不同的class样式类)
 如步骤条中需要描述性文本，可在‘steps’数组中添加describe属性，见demo。
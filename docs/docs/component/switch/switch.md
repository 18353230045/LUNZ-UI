###安装插件
npm install --save zr-switch （或确认node-modules里面有此插件）

###引入ZrSwitchModule
在当前模块的.module.ts中引入

    import { ZrSwitchModule } from 'zr-switch';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrSwitchModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <zr-switch [(checked)]="switch1" [type]="'round'"></zr-switch>

###传入数据源变量
component.ts中声明传入组件的数据源变量，如：

    export class SwitchDemoComponent implements OnInit { 
        switch1: any = true;
    }; 

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
type | 可选，switch类型 | string | 'round','button' | 'button'
icon | 可选，switch图标（type='round'时可用） | boolean | true,false | false
disabled | 可选，switch禁用 | boolean | true,false | false
size | 可选，switch尺寸 | string | lg,sm,md | md
state | 可选，switch状态 | string | success、warning、info、danger、accent、primary | primary
outline | 可选，switch外边框（type='round'时可用） | boolean | success、warning、info、danger、accent、primary | false
checked | 可选，switch选择状态（type='round'时可用） | boolean | true,false | true
border | 可选，switch边框（type='button'时可用） | boolean | true,false | true
radius | 可选，switch圆角（type='button'时可用） | string | sm,lg | sm
shadow | 可选，switch阴影（type='button'时可用） | boolean | true,false | false
text | 可选，自定义switch文字 | array | - | ['ON', 'OFF']
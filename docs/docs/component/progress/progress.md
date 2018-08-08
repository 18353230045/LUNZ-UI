###安装插件
`npm install --save zr-progress` （或确认node-modules里面有此插件）

###引入ZrProgressModule
在当前模块的.module.ts中引入

    import { ZrProgressModule } from 'zr-progress';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrProgressModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <zr-progress [progress]="0"></zr-progress>

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
progress | 百分比（必填） | number | 0-100 | -
type | 进度条类型 | string | line/circle | line
lineHeight | 进度条的高度 | number | — | 6
textInside | 进度条显示文字内置在进度条内（只在 type=line 时可用） | string | outside,inside | outside
textInside | 进度条显示文字内置在进度条内（只在 type=line 时可用） | string | outside,inside | outside
backGround | 进度条颜色 | string | - | #409EFF（蓝色）
textShow | 是否显示文字 | boolean | true/false | true
width | 进度条的宽度（圆形进度条时可用） | number | - | 126
status | 进度条的状态（圆形进度条时可用） | string | success/exception | -
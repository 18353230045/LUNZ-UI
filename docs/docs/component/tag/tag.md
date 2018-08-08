###安装插件
`npm install --save zr-tag` （或确认node-modules里面有此插件）

###引入ZrTagModule
在当前模块的.module.ts中引入

    import { ZrTagModule } from 'zr-tag';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrTagModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <zr-tag [text]="'标签一'"></zr-tag>

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
text | 必选，标签文本 | string | - | -
size | 可选，尺寸大小 | string | middle，small，large | middle
type | 可选，类型 | string | gray，primary，success，warning，danger， | gray
closeTag | 可选，配置是否可移除（配置时可向外传出移除事件close） | boolean | - | -
tagData | 可选，标签可接受的参数 | any | - | -
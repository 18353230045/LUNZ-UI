###安装插件
npm install --save zr-button （或确认node-modules里面有此插件）

###引入ZrButtonModule
在当前模块的.module.ts中引入

    import { ZrButtonModule } from 'zr-button';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrButtonModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <zr-button (handle)="click1($event)" [data]="data"></zr-button>

###传入数据源变量
component.ts中声明传入组件的数据源变量，如：

    export class ButtonDemoComponent implements OnInit { 
        ngOnInit() {

            this.data = {
                id: '01',
                name: '张三',
                sex: '男',
                age: '22',
                address: 'qigndao'
            };
        };

        click1(event: any) {
            this.demo1 = JSON.stringify(event);
        };
    }; 

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
text | 可选，button文本 | string| — | 'button'
data | 可选，可传入数据 | any | — | -
size | 可选，button尺寸大小 | string | 'btn-lg','btn-sm' | 'btn-md'
bg | 可选，button背景颜色 | string | 自定义背景色class类 | 'btn-secondary'
disabled | 可选，button是否禁用 | boolean | true,false | false
icon | 可选，button带图标 | string | 字体图标类 | -
borderRadius | 可选，button圆角边框 | string | 'm-btn--square'，'m-btn--pill' | -
shadow | 可选，button阴影 | boolean | true,false | false
toggle | 可选，button下拉箭头 | boolean | true,false | false
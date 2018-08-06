###安装插件
npm install --save zr-select-selection （或确认node-modules里面有此插件）

###引入ZrSelectSelectionModule
在当前模块的.module.ts中引入

`import { ZrSelectSelectionModule } from 'zr-select-selection';`

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            ZrSelectSelectionModule 
        ] 
    });

###.component.html中
直接引用组件标签，传入需要的配置字段，如

`<zr-select-selection [selects]="selects1" [(model)]="selectValue1"></zr-select-selection>`

###.component.ts中
声明组件需要的数据和与组件实现双向数据绑定的变量，如

    selects1: Array<any= []; 
    selectValue1: any; 
    ngOnInit() { 
        this.selects1 = [ 
            { text: '一年级', value: '01' }, 
            { text: '二年级', value: '02, disabled: true }, 
            { text: '三年级', value: '03' }, 
            { text: '四年级', value: '04' }, 
            { text: '五年级', value: '05' }, 
            { text: '六年级', value: '06' } 
        ]; 
    };

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
selects | 必选，数据源 | Array<{text:String,value:String,disabled?:Boolean}| — | -
model | 组件交互的入口，可使用[(model)]='selectValue1'实现双向数据绑定 | — | — | -
disabled | 可选，对组件进行禁用 | Boolean | true,false | false
clear | 可选，配置可清除功能 | Boolean | true,false | false
item项禁用 | 当item项禁选时，数据对象添加‘disabled：true’字段即可 | — | — | -
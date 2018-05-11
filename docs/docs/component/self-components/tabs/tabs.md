###说明
> tabs组件有三种类型，分别是：'line-tabs'，'bootstrap-line-tabs'，'bootstrap-btn-tabs'，默认是'line-tabs'，每种类型对应的样式请查看demo。

###引入SharedModule 

    import { SharedModule } from '../shared/shared.module';

> 添加到@NgModule装饰器中: 

    @NgModule({ 
        imports: [ 
            SharedModule 
        ] 
    });

###引用组件标签
> .component.html中，直接引用组件标签，传入需要类型对应的参数即可，如：

 line-tabs类型:
 
    <app-tabs [tabsData]="tabsArray1" (selected)="getItem1($event)"></app-tabs>

bootstrap-line-tabs类型:

    <app-tabs [tabsData]="tabsArray1" [tabsType]="'bootstrap-line-tabs'" (selected)="getItem1($event)"></app-tabs>

bootstrap-btn-tabs类型:

    <app-tabs [tabsData]="tabsArray1" [tabsType]="'bootstrap-btn-tabs'" (selected)="getItem1($event)"></app-tabs>

###定义数据源变量和方法

    export class TabsDemoComponent implements OnInit { 
        tabsArray1: Array<any> = []; 

        constructor() { }; 

        ngOnInit() { 
            this.tabsArray1 = [ 
                { text: '北京', id: '01' }, 
                { text: '深圳', id: '02', disabled: true }, 
                { text: '广州', id: '03' }, 
                { 
                text: '上海', 
                id: '04', 
                dropdown: true, 
                dropdownArray: [ 
                    { text: '黄浦区', id: '01' }, 
                    { text: '普陀区', id: '02' }, 
                    { text: '虹口区', id: '03' }, 
                    { text: '浦东新区', id: '04' } 
                }, 
            ]; 
        }; 

        getItem1(event: any) { 
            do something; 
        }; 
    };

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
tabsData | 必选，tabs数据源 | Array<{text:String}>，注：text字段为必传，若项有下拉项，则需添加字段dropdown:true， 和下拉选项字段dropdownArray:Array<{text:String}>,若项需禁选，则添加字段disabled：true | — | -
tabsType | 可选，tabs组件类型 | String | line-tabs，bootstrap-line-tabs，bootstrap-btn-tabs | line-tabs
bootomBorder2X | 可选，line-tabs时可用，设置激活时下边框为粗边框 | Boolean | true，false | false
colorThemeStyle | 可选，line-tabs时可用，设置item的字体颜色 | String | 任意样式类，建议使用框架自带样式类 | m-tabs-line--primary
btnColor | 可选，为bootstrap-btn-tabs时可用，设置btn的颜色 | String | 任意样式类，建议使用框架自带样式类 | nav-pills--success
iconColor | 可选，为bootstrap-tabs时可用，设置icon的颜色 | String | 任意样式类，建议使用框架自带样式类 | m--font-brand
choice | 可选，设置默认加载激活第几个tab | number | 任意小于tab总数的数字 | 0，默认激活第一个tab
selected | 选择项时向外传递事件方法，同时向外传递选择的项数据 | — | — | -
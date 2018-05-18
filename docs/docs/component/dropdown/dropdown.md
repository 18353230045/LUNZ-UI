###引入SharedModule
> 在当前模块的.module.ts中引入

    import { SharedModule } from '../shared/shared.module';

> 添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            SharedModule 
        ] 
    });

###引用组件标签
> .component.html中，直接引用组件标签，如：

    <app-dropdown-selection [options]="options" [position]="'left'" [dropText]="'部门'" (selected)="handle1($event)"></app-dropdown-selection>

###传入数据源变量
> component.ts中声明传入组件的数据源变量，如：

    export class DropdownComponent implements OnInit { 
        options: Array<any> = []; 

        constructor() { }; 

        ngOnInit() { 
            this.options = [ 
                { text: 'item1', id: '01' }, 
                { text: 'item2', id: '02', disabled: true }, 
                { 
                    text: 'item3', 
                    id: '03', 
                    childrenOpen: false, 
                    children: [ 
                        { text: 'item3-item4', id: '05' }, 
                        { text: 'item3-item10', id: '04' } 
                    ] 
                } 
                { text: 'item4', id: '04' }, 
                { text: 'item5', id: '05' }, 
                { 
                    text: 'item6', 
                    id: '06', 
                    childrenOpen: false, 
                    children: [ 
                        { text: 'item6-item4', id: '05' }, 
                        { text: 'item6-item10', id: '04' } 
                    ] 
                } 
            ]; 
        }; 
    }; 

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
options | 必选，数据源 | Array<{text:String,id:String,disabled?:Boolean}> | — | -
type | 可选，组件类型（btn,icon） | String | btn,icon | btn
position | 可选，组件展开位置 | String | center,right,left | center
dropText | 可选，为btn型时可用，显示列表title，为icon型时不可用 | String | — | -
icon | 可选，为icon型可用，为dropdown触发按钮添加图标 | String | — | la la-ellipsis-h
iconClass | 可选，为icon型可用，为icon设计样式 | String | — | -
btnColor | 可选，为btn型可用，更改按钮背景颜色 | String | — | btn-secondary
separateCharacter | 可选，为btn型并且配置多选时可用，选择值之间的隔字符 | String | 任意 | /
trigger | 可选，选择触发dropdown方式 | String | click,hover | click
selectParent | 可选，是否可以选择父级 | Boolean | true,false | false
multiselect | 可选，btn型可用，选择是否支持多选 | Boolean | true,false | false
selected | 选择item项时向外传递事件方法，同时向外传递选择的item值 | — | — | -
remove | 可选，为btn型时，移除value值时向外传递事件 | — | — | -
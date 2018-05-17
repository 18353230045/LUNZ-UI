###引入SharedModule
> 在当前模块的.module.ts中引入: 

`import { SharedModule } from '../shared/shared.module';`

> 添加到@NgModule装饰器中: 

    @NgModule({
        imports: [ 
            SharedModule 
        ] 
    });

###添加时间选择器指令
> .component.html中，直接在input标签上添加‘appDatepicker’指令，给input标签传入id（必须），如：

`<input class="form-control" type="text" id="default" appDatepicker [(ngModel)]="date" />`

###定义变量
> .component.ts中声明用于与组件实现双向数据绑定的变量，如：

    export class DatepickerSelectComponent implements OnInit { 
        date:String; 

        constructor() { }; 

        ngOnInit() { }; 
    };

###指令参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
date | 必选，组件交互入口，可使用[(date)]='date1'实现双向数据绑定 | any | — | -
original | 可选，当配置传出原始时间格式的可用，用于组件交互入口，可使用[(original)]='date1'实现双向数据绑定 | any | — | -
dateType | 可选，配置组件传出时间类型 | String | displayDate,originalDate | displayDate
format | 可选，日期格式化，当需要传出原始时间格式时，format需传入空字符串，如：[format]="" | String | 可通过d，dd，D，DD，m，mm，M，MM，yy，yyyy任意组合 | yyyy-mm-dd
todayHighlight | 可选，今日高亮 | Boolean | true,false | true
autoclose | 可选，选择完后自动关闭 | Boolean | true,false | true
calendarWeeks | 可选， 显示左侧的星期数 | Boolean | true,false | false
clearBtn | 可选，显示清除按钮 | Boolean | true,false | false
todayBtn | 可选，显示今日按钮 | Boolean | true,false | false
startView | 可选，打开时的视图 | String | days,months,years | days
minViewMode | 可选， 最小选择视图 | String | days,months,years | days
maxViewMode | 可选， 最大选择视图 | String | days,months,years | years
multidate | 可选，支持多选 | Boolean | true,false | false
multidateSeparator | 可选， 当支持多选时，值于值之间的隔字符 | String | 任意 | ,
orientation | 可选，日期选择框弹出位置 | String | left,right,bottom,auto,top left,top right,auto top,auto bottom | bottom
startDate | 可选，设定开始日期 | String | — | -
endDate | 可选，设定结束日期 | String | — | -
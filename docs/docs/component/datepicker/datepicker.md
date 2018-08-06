###引入SharedModule
在当前模块的.module.ts中引入: 

`import { SharedModule } from '../shared/shared.module';`

添加到@NgModule装饰器中: 

    @NgModule({
        imports: [ 
            SharedModule 
        ] 
    });

###添加时间选择器指令
.component.html中，直接在input标签上添加‘appDatepicker’指令，给input标签传入id（必须），如：

`<input class="form-control" type="text" id="default" appDatepicker [(ngModel)]="date" />`

###定义变量
.component.ts中声明用于与组件实现双向数据绑定的变量，如：

    export class DatepickerSelectComponent implements OnInit { 
        date:String; 

        constructor() { }; 

        ngOnInit() { }; 
    };

###指令参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
ngModel | 必选，组件交互入口，可使用[(date)]='date1'实现双向数据绑定 | any | — | -
dateType | 可选，传出时间类型["originalDate"："原始时间类型"，"displayDate"："常见显示类型]" | String | originalDate,displayDate | displayDate
format | 可选，日期格式化 | String | y（年），m(月)，d（日），h（时），i（分），s（秒），自由组合 | yyyy-mm-dd hh:ii:ss
showMeridian | 可选，日期格式化 | Boolean | true，false | true
autoclose | 选择日期后自动关闭 | Boolean | true，false | true
startView | 开始视图 | Number | 0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图 | 2
weekStart | 开始星期 | Number | 0：星期一，1：星期二，2：星期三，3：星期四，4：星期五，5：星期六，6：星期天 | 1
startDate | 开始日期 | Date | 无,（开始日期前面的不能选择） | —
endDate | 结束日期 | Date | 无,（结束日期后面的不能选择） | —
daysOfWeekDisabled | 禁选星期 | String | Array | 无,[例如：0,6或者[0,6]，即：禁止选择星期六和星期天的所有日期] | —
minView | 最小选择视图 | String | Number | 0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图 | 0
maxView | 最大选择视图 | String | Number | 0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图 | 4
todayBtn | 显示今日按钮 | Boolean | true,false | false
clearBtn | 显示清楚按钮 | Boolean | true,false | false
todayHighlight | 今日高亮 | Boolean | true,false | true
keyboardNavigation | 键盘选择 | Boolean | true,false | true
forceParse | 强制解析 | Boolean | true,false | true
minuteStep | 选择分时最小步长 | Number | - | 5
pickerPosition | 选择框位置 | String | - | bottom-right
initialDate | 打开时初始日期 | Date | - | -
isIcon | 设置图标触发 | Boolean | true,false | true
iconClass | 设置图标样式类 | String | - | la la-calendar
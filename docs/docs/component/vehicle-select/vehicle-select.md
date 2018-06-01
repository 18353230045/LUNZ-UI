###引入SharedModule
在当前模块的.module.ts中引入

    import { SharedModule } from '../shared/shared.module';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            SharedModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：
在使用车型选择组件的视图（.component.html）中，直接引用组件标签即可， 传入需要组件传出的值的类型[‘brand’：车品牌（id/name），‘series’：车品牌(id/name)+车系列(id/name)， ‘model’：车品牌(id/name)+车系列(id/name)+车型所有信息]和与组件进行通信的变量，此两项必传。例如：

    <app-vehicle-selection [outputType]="'brand'" [(outPutResult)]="brand"></app-vehicle-selection>

###声明变量 
声明用于和组件通讯的变量，例如：

    export class VehicleSelectionDemoComponent implements OnInit { 
        brand: any; 

        constructor() { }; 

        ngOnInit() { }; 

    };

###组件参数说明
参数|说明|类型|可选值|默认值
-|-|-|-|-
outputType | 可选，选择输出类型 | String | brand（车品牌），series（车系），model（车型） | -
outputType | 可选，选择输出类型 | String | brand（车品牌），series（车系），model（车型） | -
separateCharacter | 可选，当配置为车辆系列和车辆品牌是可用，类别之间的隔字符 | String | 任意 | /
###指令对照表
>
名称|AngularJS|Angular4|说明
-|-|-|
应用启动引导 |`ng-app`|`platformBrowserDynamic().bootstrapModule(AppModule)`
绑定/插值表达式 |`{{ variable }} /ng-bind|`|`{{ variable }}`|都是单向绑定
局部变量 |`<tr ng-repeat="movie in vm.movies"></tr>`|`<tr *ngFor=“let movie in vm.movies"></tr>`|需要使用 let 关键字定义
添加/移除样式类 |`ng-style <div ng-style="{color: colorPreference}">`|`[ngStyle] <div [ngStyle]="{‘color’:’green’}">[style.color] <div [style.color]="{‘green’}">`
绑定事件 |`ng-click <button ng-click=“toggle ()"></div>`|`(click)  <button (click)="toggle ()"></button>`|()
组件控制器 |`ng-controller`|`@Component({  })`|()
元素的显示与隐藏 |`ng-hide/show  <div ng-hide/show="{{variable }}"></div>`|`[hidden] <div  [hidden]="{{variable }}"></div>`
a 标签的href属性 |`ng-href  <a ng-href="{{variable }}"></a>`|`[href]  <a [href]="variable"></a>`
移除或重建 DOM |`ng-if <a ng-if="{{variable }}"></a>`|`*ngIf  <a  *ngIf="{{variable }}"></a>`|*
双向数据绑定 |`ng-model  <input ng-model="variable"/>`|`[(ngModel)]  <input [(ngModel)]="variable" />`|[( )]
重复渲染DOM |`ng-repeat  <tr ng-repeat="movie in vm.movies"></tr>`|`*ngFor <tr *ngFor="let movie of movies"></tr>`| *
管道 |`<td>{{movie.title | uppercase}}</td>`|`<td>{{movie.title | uppercase}}</td>` | 都是数据过滤处理，叫法不同。
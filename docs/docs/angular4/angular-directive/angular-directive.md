###说明
Angular4中的指令和Angular.js中一样，都是用于扩展HTML标签。

Angular4中的常见的指令有三种类型：

1、组件 — 拥有模板的指令

2、结构型指令 — 通过添加和移除DOM 元素改变 DOM 布局的指令

3、属性型指令 — 改变元素、组件或其它指令的外观和行为的指令。

###常用内置指令

名称|指令
-|-
应用启动引导 |`ng-app`
绑定/插值表达式 |`{{ variable }} /ng-bind`
局部变量 |`<tr ng-repeat="movie in vm.movies"></tr>`
添加/移除样式类 |`ng-style <div ng-style="{color: colorPreference}">`
绑定事件 |`ng-click <button ng-click=“toggle ()"></div>`
元素的显示与隐藏 |`ng-hide/show  <div ng-hide/show="{{variable }}"></div>`
a 标签的href属性 |`ng-href  <a ng-href="{{variable }}"></a>`
移除或重建 DOM |`ng-if <a ng-if="{{variable }}"></a>`
双向数据绑定 |`ng-model  <input ng-model="variable"/>`
重复渲染DOM |`ng-repeat  <tr ng-repeat="movie in vm.movies"></tr>`
管道 |`<td>{{movie.title | uppercase}}</td>`
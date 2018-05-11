###安装插件
> 命令行终端通过npm安装第三方插件，注意添加参数--save,即 `npm install --save plugin-name`

###引入样式表文件
> 在 'src\main.scss' 文件中引入第三方插件的样式表文件，或在 '.angular-cli.json' 文件'apps\styles' 节点下引入样式文件

###引入脚本文件
> 在 '.angular-cli.json' 文件 'apps\scripts' 节点下引入 第三方插件的JS文件

###引入第三方插件的全局变量
> 在组件中使用先通过 'declare const 第三方插件的全局变量名: any' 引入，例如jQuery：`declare const $: any;`

###重要提示
> 在组件中使用第三方插件的时候要注意上下文作用域，特别是第三方插件回调函数，为了规避第三方插件回调函数作用域的问题，请使用箭头函数
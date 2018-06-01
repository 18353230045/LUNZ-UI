###样式表文件
在 'src\main.scss' 文件中引入样式表文件，或在 '.angular-cli.json' 文件'apps\styles' 节点下引入样式文件

###脚本文件
在 '.angular-cli.json' 文件 'apps\scripts' 节点下引入JS文件

###提示
如使用第三方js插件时需要在组件中先通过 'declare const 第三方插件的全局变量名: any' 引入，例如jQuery：'declare const $: any;'

使用时要注意上下文作用域，特别是第三方插件回调函数，为了规避第三方插件回调函数作用域的问题，请使用箭头函数
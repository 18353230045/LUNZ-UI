###说明
图表使用第三方插件['highcharts'](https://www.hcharts.cn/),相关依赖已经引入到框架中，使用时只需在组件中定义highcharts全局变量即可使用。 使用时推荐使用highcharts官方推出的图形化界面工具来创建自己想要的图表类型。
###下载工具
1、工具地址： [https://github.com/highcharts/highcharts-editor/releases](https://github.com/highcharts/highcharts-editor/releases) 根据自己电脑选择合适的版本，win、linux、mac均有。

2、打开工具，选择模拟数据或自己创建。 

3、选择图表类型。 

4、图表配置，图表的所有属性均可在里面配置。 

5、导出配置，项目中使用建议导出JSON格式，复制到项目中，封装到自己的函数中，替换里面的模拟数据即可。 

6、highcharts内置有十种主题，可以引入不同的主题脚本来实现更换主题，或者通过设置'Highcharts.setOptions(Highcharts.theme)'来设置主题。 

7、highcharts官方使用文档：[使用教程](https://www.hcharts.cn/docs)、[highcharts API文档](https://api.hcharts.cn/highcharts)、[highmaps API文档](https://api.hcharts.cn/highmaps)
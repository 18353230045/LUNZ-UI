###规范及注意事项
- 为了与框架友好兼容，组件使用angular版本应```>=4.0.0 <6.0.0```；
- 严格遵守angular官方推荐的[代码规范](https://angular.cn/guide/styleguide)，文件需格式化，便于阅读；
- 所有源码存放于 ```src``` 目录;
- 组件需配置demo，于```demo```目录下;
- 组件需配置使用文档，于根目录下，用markdown文件编写;
- 约定组件名前面添加```zr```,例如：数据表格组件，```zr-datatable```;
- 各类功能文件需建立特定的目录，便于辨识，如：组件全放于```component```目录下，指令全放于```directive```目录下，等等;
- 文件命令尽量不要缩写，便于辨识，用全称英文单词，多个单词用短横线分割，如：```zr-×××.module.ts```,```zr-×××.component.ts```；
- 组件样式尽量和框架主题相应，不要有太大的差别，建议使用框架中的样式表；
- 组件尽可能的预留扩展配置；
- 引入到组件中未使用依赖，一定要移除，package.json文件中也得移除；
- 使用到的依赖注意与框架的兼容，尽量不要使用最新版本，使用稳定版本即可；
###开发技巧
- 工具：```yeoman``` 工具介绍：[http://yeoman.io/learning/index.html](http://yeoman.io/learning/index.html)

- 模板：```generator-angular-library``` 模板地址：[https://github.com/mattlewis92/generator-angular-library](https://github.com/mattlewis92/generator-angular-library)

使用：

1、安装工具```yeoman```,命令：```npm install -g yo```；

2、安装模板```generator-angular-library```,命令：```npm install -g yo generator-angular-library```；

3、在电脑一硬盘位置新建组件目录，例如：zr-datatable;

4、用VScode打开命令行，执行```yo```, [前提是安装了yeoman工具],此时会列出你本地安装的所有模板，选择 ```Angular-library```,回车;

5、根据出现的提示输入项目的信息，回车，最后会安装模板对应的依赖，提示：此模板兼容的angular版本为```>=4.0.0 <6.0.0```;

6、模板生成的有主要三个目录，分别为：```src```,```test```,```demo```,```node_modules```,模板自动添加.gitignore忽略文件;

7、运行npm start，启动模板demo;

8、编写组件代码;

9、添加demo及使用Markdown文档;

10、试编译，运行```npm run build:umd```;

11、编译通过，邮件联系leihg@zhongruigroup.com，请求添加至公司npm账户;

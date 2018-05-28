###[Kudu](https://github.com/projectkudu/kudu) 自动部署
###准备
1、在 Kudu 中创建 Application

2、打开 Application -Configuration 页签，在 Git Branch 中输入 stage （测试环境） 或者 live (生产环境)

3、在 Add custom property 区域，输入 property name = `PROJECT` & property value = `./dist`，单击 `Add property` 按钮，将其添加到 Custom properties 中

### 配置 git
1、打开 SourceTree

2、将 Kudu 的 git 路径添加 git 的远程路径中

### 发布
1、打开 SourceTree

2、确认全部更改已提交到 git

3、使用 VS Code 打开项目

4、使用 Ctrl+` 快捷键打开命令行

5、执行 `npm run stage` 发布到测试环境

6、执行 `npm run live` 发布到生产环境

### 自定义发布命令
 1、打开 package.json 文件

 2、定位到 `scripts\stage`："stage": "npm run lint && git checkout stage && git merge master --no-edit --no-ff && npm run build:stage && git add . && git commit -m \"release stage\" && git push && git checkout master"

 3、这是一个组合命令，命令分别为：

命令                  | 说明
---------------------|--------------------------------
npm run lint         | 检查代码规范
git checkout stage    | 检出 stage 分支
git merge master --no-edit --no-ff  | 将 master 分支合并到 stage 分支中
npm run build:stage   | 以 stage 方式编译项目
git add .             | 将更改内容添加到索引
git commit -m \"release stage\"   | 提交更改，注释为 "release stage"
git push                          | 推送到远程服务器
git checkout master"              | 切换回 master 分支
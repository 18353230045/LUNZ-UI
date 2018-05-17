###说明
> 使用 [NPM](https://www.npmjs.com/) 管理依赖的包, 可以在 [www.npmjs.com](https://www.npmjs.com/) 上查找更多的包。查看[这里](https://docs.npmjs.com/)关于 NPM 包更多的使用帮助。

###常用命令
命令                                   | 说明
--------------------------------------|--------------------------------------------------------------------------------------
npm install [package_name]@[version]  | 安装包到本地，如 `npm install sax@0.1.1`, `npm install sax`, `npm install sax@latest`
npm install [package_name] --save     | 安装包到本地，同时写入 package.json 文件中，如 `npm install sax@0.1.1 --save`
npm install [package_name] --dev      | 只作为开发时使用安装包到本地
npm install                           | 安装 package.json 文件中所有依赖的包到本地
npm update [package_name]             | 更新包
npm update                            | 更新 package.json 文件中所有依赖的包
LUNZ+采用前端与后端完全分离的方式开发，环境变量【environments】用于向服务器端获取数据，位于 'src/environments' 目录下面。

默认包括三个文件:

'environment.ts': 开发环境，运行`npm run start` 命令时使用此文件下面的环境变量。

'environment.stage.ts': 测试环境，运行`npm run stage` 命令时使用此文件下面的环境变量。

'environment.prod.ts': 正式环境，运行`npm run build` 命令时使用此文件下面的环境变量。

自定义环境变量文件及编译命令

- 定位到'src/environments'目录下
- 新建文件 'environment.***.ts'，配置属性节点参照'environment.ts'
- 将新建的环境变量'environment.***.ts'添加到'.angular-cli.json'文件下面的'apps'节点下面的'environments'节点中，例如：

        "environments": {
        
            "***": "environments/environment.***.ts"

        }

- 在'package.json'文件'scripts'节点下定义编译命令，参考'stage'命令，注意对应使用的环境变量
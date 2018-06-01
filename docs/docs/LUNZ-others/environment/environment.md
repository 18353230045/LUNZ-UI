LUNZ+采用前端与后端完全分离的方式开发，环境变量【environments】用于向服务器端获取数据，位于 'src/environments' 目录下面。

包括三个文件:

'environment.ts': 开发环境，运行`npm run start` 命令时使用此文件下面的环境变量。

'environment.stage.ts': 测试环境，运行`npm run stage` 命令时使用此文件下面的环境变量。

'environment.prod.ts': 正式环境，运行`npm run build` 命令时使用此文件下面的环境变量。
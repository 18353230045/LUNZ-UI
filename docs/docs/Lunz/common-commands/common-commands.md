
###常用命令
命令                           | 说明
------------------------------|---------------------------------------------------------------------------------------
npm start                     | 运行开发环境 `http://localhost:9200/`
npm run build                 | 以生产环境编译项目到 `dist/` 目录
npm run build:stage           | 以测试环境编译项目到 `dist/` 目录
npm run state                 | 发布到测试环境，依赖 [Kudu](https://github.com/projectkudu/kudu)
npm run live                  | 发布到生产环境，依赖 [Kudu](https://github.com/projectkudu/kudu)
npm run clean                 | 清空编译目录 `dist/` 目录
npm test                      | 以观察模式运行单元测试，使用 [Karma](https://karma-runner.github.io) 工具
npm run test:ci               | Lint code and run unit tests once for continuous integration
npm run e2e                   | Run e2e tests using [Protractor](http://www.protractortest.org)
npm run lint                  | 代码规范检查
npm run translations:extract  | Extract strings from code and templates to `src/app/translations/template.json`
npm run docs                  | Display project documentation

> When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

> The default build environment is `prod`.
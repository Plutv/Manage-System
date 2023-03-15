## 使用方法  
  进入fe目录依次执行命令：
  ```bash
  > npm i
  > npm run build
  ```
  进入server目录执行以下命令：
  ```bash
  > npm i 
  > node index.js
  ```
  用户名：admin1
  密码：123

## 说明

fe是前端项目，start启动时，默认开启3000端口，然后调用api接口时，会proxy到`127.0.0.1:3001`。build时，会将资源打包到`../server/static`目录（在.env配置了build_path）。

server是后端项目，`node index.js`启动时，会开启一个3001服务，会将static目录使用koa-static开启为静态资源，若此时该目录存在（fe执行了build构建），则浏览器访问`127.0.0.1:3001`，能够访问到页面。

## 命令

> fe

```bash
# 开发
npm run start
# 构建
npm run build
```

> server

```bash
# 运行
node index.js
```

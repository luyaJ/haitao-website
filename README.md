# 使用 koa+vue+iview 实现一个海淘网站

## Install

```bash
# 初始化一个 node 项目并修改入口文件为 server.js
npm init 

#  安装需要的插件
npm install --save koa koa-router koa-bodyparser mongoose nodemon bcryptjs gravatar

# 在当前项目中创建前端项目 命名client
vue create client

# 使用 concurrently 实现前后端连载 运行项目
npm run dev
```

* [bcryptjs](https://www.npmjs.com/package/bcryptjs) 加密
* [concurrently](https://www.npmjs.com/package/concurrently) 实现前后端连载

## 文档

[世界时间](http://time.123cha.com/)
[UTC与GMT](https://www.bbsmax.com/A/E35pywYdvX/)
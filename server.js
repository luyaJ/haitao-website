const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();
const passport = require('koa-passport');

app.use(bodyParser());

// 引入并连接数据库
const db = require("./config/keys").dbUrl;
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
        .then(() => console.log("MongoDB Connected..."))
        .catch(err => console.log(err));

// passport初始化 存储
app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中 passport.js
require("./config/passport")(passport);

// 引入路由
const users = require("./routes/api/users");

// 配置路由地址 localhost:3000/api/users
router.use("/api/users", users);
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 端口
const port = process.env.PORT || 3000;

// 跨域 配置
app.use(cors({
  origin: (ctx) => {
    if (ctx.url === '/api') {
      return '*';
    }
    return 'http://localhost:3000';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],  // 设置允许的HTTP请求类型
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// 监听端口
app.listen(port, () => {
  console.log("Server started in port 3000...");
})
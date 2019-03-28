const Router = require("koa-router");
const router = new Router();
const bcrypt = require("bcryptjs");
const tools = require("../../config/tools");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('koa-passport');

// 引入User
const User = require("../../models/User");

// 引入input验证
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

/**
 * @route GET api/users/test
 * @desc 测试接口的地址
 * @access 接口是公开的
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: 'test works...' };
})

/**
 * @route POST api/users/register
 * @desc 注册接口的地址
 * @access 接口是公开的
 */
router.post("/register", async (ctx) => {
  const { errors, isValid } = validateRegisterInput(ctx.request.body);
  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  const findResult = await User.find({ email: ctx.request.body.email });
  if(findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { email: "邮箱已被占用~" };
  } else {
    const newUser = new User ({
      username: ctx.request.body.username,
      email: ctx.request.body.email,
      password: tools.enbcrypt(ctx.request.body.password),
      avatar: ctx.request.body.username.substring(0, 1).toLocaleUpperCase()
    });

    // 存储到数据库
    await newUser.save()
                  .then(user => ctx.body = user)
                  .catch(error => console.log(error));

    // 返回json数据
    ctx.body = newUser;
  }
})

/**
 * @route POST api/users/login
 * @desc 登录接口的地址 返回token
 * @access 接口是公开的
 */
router.post("/login", async (ctx) => {
  const { errors, isValid } = validateLoginInput(ctx.request.body);
  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  const findResult = await User.find({ email: ctx.request.body.email });
  const password = ctx.request.body.password;
  const user = findResult[0];
  if (findResult.length === 0) {
    ctx.status = 404;
    ctx.body = { email: "此用户不存在!" };
  } else {
    // 验证密码
    const comparePasswordResult = await bcrypt.compareSync(password, user.password);
    if (comparePasswordResult) {
      // 返回token
      const payload = { id: user.id, name: user.name };
      // jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

      ctx.status = 200;
      ctx.body = { success: true, token: "Bearer " + token };
    } else {
      ctx.status = 404;
      ctx.body = { password: "密码错误!" };
    }
  }
})

/**
 * @route GET api/users/current
 * @desc 用户信息接口地址 返回当前用户信息
 * @access 接口是私有的
 */
// passport.authenticate('jwt', { session: false }) 可以监听到 passport.js 中的jwt_payload
router.get("/current", passport.authenticate('jwt', { session: false }), async (ctx) => {
  // ctx.body = { success: true };
  ctx.body = {
    id: ctx.state.user.id,
    username: ctx.state.user.username,
    email: ctx.state.user.email
  }
})

module.exports = router.routes();
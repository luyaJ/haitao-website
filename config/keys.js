module.exports = {
  dbUrl: "mongodb://admin:123qwe@ds141294.mlab.com:41294/koa-haitao",
  secretOrKey: "secret",
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '1579618152@qq.com'
    },
    get pass() {
      return ''
    }
  },
  get code() {
    return () => {
      return Math.random().toString(16).slice(2, 6).toUpperCase();
    }
  },
  get expire() {
    return () => {
      return new Date().getTime() + 60*60*1000
    }
  }
}
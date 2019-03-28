// 封装 加密
const bcrypt = require("bcryptjs");

const tools = {
  enbcrypt(password) {
    var salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}

module.exports = tools;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据模板
const ProfileSchema = new Schema({
  user: {  //关联数据表
    type: String,
    refs: "users",
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  location: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = User =  mongoose.model("profiles", ProfileSchema);
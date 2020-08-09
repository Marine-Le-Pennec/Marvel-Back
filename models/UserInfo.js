const mongoose = require("mongoose");

const UserInfo = mongoose.model("UserInfo", {
  email: { type: String, unique: true },
  token: String,
  hash: String,
  salt: String,
  account: {
    username: { type: String, required: true },
  },
});
module.exports = UserInfo;

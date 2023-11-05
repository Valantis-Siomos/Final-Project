const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: {type:String,enum:["buyer","seller"]}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

const mongoose = require("mongoose");

//viewers who can buy
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    //to avoid the empty fields
    required: true,
    unique: true,
  },
  password: {
    type: String,
    //to avoid the empty fields
    required: true,
  },
});

//admin users with fixed username and password
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: "valantis@gmail.com", // fix email here
  },
  password: {
    type: String,
    required: true,
    default: "111", // fix password here
  },
});

const ViewerUser = mongoose.model("ViewerUser", UserSchema);
const AdminUser = mongoose.model("AdminUser", AdminSchema);

module.exports = {
  ViewerUser,
  AdminUser,
};

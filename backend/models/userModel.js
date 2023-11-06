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
    default: process.env.ADMIN_EMAIL, // fix email here and also hide the email
  },
  
  password: {
    type: String,
    required: true,
    default: process.env.ADMIN_PASSWORD, // fix password here and also hide the pass
  },
});

const User = mongoose.model("ViewerUser", UserSchema);
const Admin = mongoose.model("AdminUser", AdminSchema);

module.exports = {
  User,
  Admin,
};

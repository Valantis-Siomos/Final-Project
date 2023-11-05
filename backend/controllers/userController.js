const User = require("../models/UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../middleware/authorization");

const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "Both email and password are required." });
    }
    let userFound = await User.findOne({ email });
    if (userFound) {
      return res.send({
        msg: "This email already exists, login or register with another email.",
      });
    }
    let found = await User.findOne({ email });
    if (found) {
      return res.send({ msg: "Email already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword });
    return res.send({ msg: "Registered successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(402)
        .send({ msg: "Both email and password are required." });
    }
    let oldUser = await User.findOne({ email });
    if (oldUser) {
      let validPassword = await bcrypt.compare(password, oldUser.password);
      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid password" });
      } else {
        let token = jwt.sign(
          {
            email: oldUser.email,
            id: oldUser._id,
          },
          process.env.TOKEN_KEY,
        );
        res.status(200).send({ msg: "Logged in successfully.",token });
      }
    } else {
      return res.status(404).send({ msg: "Invalid email." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error. Login failed." });
  }
};

module.exports = { register, login };

const User = require("../models/userModel");
const bcrypt = require("bcrypt")

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
    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
    await User.create({ email: email, password: hashPassword });
    res.send({ msg: "Registered successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "Both email and password are required." });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      let validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid password" });
      } else {
        res.status(200).send({ msg: "Logged in successfully." });
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

const Product = require("../models/productModel");
require("dotenv").config();
const verifyToken = require("../middleware/authorization");

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find().populate("creator", "email");
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "internal server error (router getAllProducts)" });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log(req.user)
    let creator = req.user.id;
    let { title, imgUrl, description, price } = req.body;
    let newProduct = {
      title,
      imgUrl,
      description,
      price,
      creator,
    };
    let product = await Product.create(newProduct);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error from create controllers" });
  }
};

const updateProduct = async (req, res) => {
  try {
    let clientValue = req.body;
    await Product.updateOne({ _id: req.params.id }, clientValue);
    res.status(200).send({ msg: "update router is work" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "problem from update router" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "delete router is work" });
  } catch {
    console.log(error);
    res.status(500).send({ msg: "problem from delete router" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

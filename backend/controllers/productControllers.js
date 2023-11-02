const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    let product = await Product.find();
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "internal server error (router getAllProducts)" });
  }
};

const createProduct = async (req, res) => {
  try {
    let newProduct = req.body;
    let product = await Product.create(newProduct);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "internal server error (router createProduct)" });
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
  } catch (error) {
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

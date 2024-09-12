const Product = require("../models/productModel");
const { User, Admin } = require("../models/UserModel");
require("dotenv").config();
const verifyToken = require("../middleware/authorization");
// const cloudinary = require("../cloudinary");

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Internal server error (getProductsByCategory)" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "internal server error (router getAllProducts)" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.send(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to retrieve categories." });
  }
};

const createProduct = async (req, res) => {
  try {
    // console.log(req.user)
    //the game start here
    if (
      !req.user ||
      !req.user.email ||
      req.user.email !== process.env.REAL_ADMIN
    ) {
      return res
        .status(403)
        .send({ msg: "Unauthorized. Only admin can create products." });
    }
    let { title, description, price, imageUrl, category } = req.body;
    
    let newProduct = {
      title,
      price,
      description,
      imageUrl,
      category,
    };
    let createdProduct = await Product.create(newProduct);
    res.send(createdProduct);
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "problem from delete router" });
  }
};

module.exports = {
  getAllProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
};

const Product = require("../models/productModel");
// const Category = require("../models/categoriesModel")
require("dotenv").config();
const verifyToken = require("../middleware/authorization");
const cloudinary = require("../cloudinary");

// const getCategories = async(req, res) => {
//   try {
//     let categories = await Category.find();
//     res.status(200).send(categories)
//   } catch (error) {
//     console.log(error);
//     res.status(500)
//         .send({mesg: "error to retrieve categories"})
//   }
// }

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

const createProduct = async (req, res) => {
  try {
    console.log(req.user)
    let { title, description, price, category } = req.body;
    // let result = await cloudinary.uploader.upload(req.file.path);
    let newProduct = {
      title,
      price,
      description,
      // imageUrl: result.secure_url,
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
  createProduct,
  updateProduct,
  deleteProduct,
  
};

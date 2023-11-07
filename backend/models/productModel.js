const mongoose = require("mongoose");
const cloudinary = require("../cloudinary");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    description: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

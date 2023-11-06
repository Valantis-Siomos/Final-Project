const mongoose = require("mongoose");
const cloudinary = require("../cloudinary-config");

const productShema = new mongoose.Schema(
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

const Product = mongoose.model("Product", productShema);

module.exports = Product;

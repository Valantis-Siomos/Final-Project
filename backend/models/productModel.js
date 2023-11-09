const mongoose = require("mongoose");
const cloudinary = require("../cloudinary");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    description: String,
    imageUrl: String,
    category: {
      type: String,
      enum: [ "Living Room", "Bedroom", "Home Office", "Decoration"]
    }
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

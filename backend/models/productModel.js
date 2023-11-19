const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    imageUrl: String,
    category: {
      type: String,
      enum: [ "Living", "Bedroom", "Office", "Decoration"]
    }
    
  },
  {
    imageUrl: String,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

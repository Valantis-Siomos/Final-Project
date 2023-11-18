const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    imageUrl: String,
    category: {
      type: String,
      enum: [ "Living Room", "Bedroom", "Home Office", "Decoration"]
    }
    
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

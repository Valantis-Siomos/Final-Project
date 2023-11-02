const mongoose = require("mongoose");



const productShema = new mongoose.Schema(
    {
        title: String,
        price: Number,
        description: String,

    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model("Product", productShema);

module.exports = Product;
const mongoose = require("mongoose");



const productShema = new mongoose.Schema(
    {   
        title: String,
        price: Number,
        description: String,
        creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model("Product", productShema);

module.exports = Product;
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    productName: { 
        type: String,
        required: true,
        trim: true 
    },

    productPrice: { 
        type: Number,
        required: true,
        trim: true 
    },

    productDiscount: { 
        type: Number,
        required: true,
        trim: true 
    },

    productDescription: { 
        type: String,
        required: true,
        trim: true 
    },

    categoryType: { 
        type: String,
        required: true,
        trim: true  
    },

    productImage: { 
        type: String,
        required: false,
        trim: true 
    }

});

const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
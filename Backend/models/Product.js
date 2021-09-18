// -----------------------------
//     PRODUCT MODEL - BACKEND
// -----------------------------

//Function - Product management
//Student name - H.M. Kasuni Navodya
//Student ID - IT19144986

//Importing the mongoose from the installed package - mongoose@8.0.2
const mongoose = require('mongoose');

//Schema name (local) - ProductSchema
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

/**
 * Schema name on the database - Products
 * 
 * Exported model to be used on the Product route
 */
const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
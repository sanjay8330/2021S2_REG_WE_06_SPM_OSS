const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    productName: { 
        type: String,
        required: true,
        trim: true 
    },

    productImage: { 
        type: String,
        required: false,
        trim: true 
    },

    productDescription: { 
        type: String,
        required: true,
        trim: true 
    },

    productPrice: { 
        type: Number,
        required: true,
        trim: true 
    },

    productDescription: { 
        type: String,
        required: true,
        trim: true 
    },

    productColor: { 
        type: String,
        required: true,
        trim: true 
    },

    productSize: { 
        type: String,
        required: true,
        trim: true 
    },

    productQuantity: { 
        type: Number,
        required: true,
        trim: true 
    },

});

const Item = mongoose.model("Items", ItemSchema);
module.exports = Item;
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: false,
        trim: true 
        /*type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Users'*/
    },

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

    date: {
        type: String,
        required: true,
        trim: true
    }

});

const Item = mongoose.model("Items", ItemSchema);
module.exports = Item;
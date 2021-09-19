const mongoose = require('mongoose');
//Item schema
// ----------------------------
//     ITEM MODEL - BACKEND
// ----------------------------

//Function - Shopping Cart management
//Student name - Ekanayake K.L.W
//Student ID - IT19150758

//Schema name (local) - ItemSchema
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

/**
 * Schema name on the database - Items
 * 
 * Exported model to be used on the insertitem route
 */
const Item = mongoose.model("Items", ItemSchema);
module.exports = Item;
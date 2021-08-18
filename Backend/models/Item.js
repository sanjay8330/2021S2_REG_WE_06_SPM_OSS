const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    itemColor: { 
        type: String,
        required: true,
        trim: true 
    },

    itemSize: { 
        type: String,
        required: true,
        trim: true 
    },

    itemQuantity: { 
        type: Number,
        required: true,
        trim: true 
    },

});

const Item = mongoose.model("Items", ItemSchema);
module.exports = Item;
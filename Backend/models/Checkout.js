const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({

    paymentMethod: { 
        type: String,
        required: true,
        trim: true 
    },

    amount: { 
        type: String,
        required: false,
        trim: true 
    },

    slip: { 
        type: String,
        required: false,
        trim: true 
    },

    comments: { 
        type: String,
        required: false,
        trim: true 
    },

    date: { 
        type: String,
        required: true,
        trim: true 
    },

    userId: { 
        type: String,
        required: false,
        trim: true 
    },

});

const checkout = mongoose.model("Checkout", CheckoutSchema);
module.exports = checkout;
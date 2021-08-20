const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({

    paymentMethod: { 
        type: String,
        required: true,
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
    }

});

const checkout = mongoose.model("Checkout", CheckoutSchema);
module.exports = checkout;
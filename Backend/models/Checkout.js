// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826

const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({

    paymentMethod: { 
        type: String,
        required: true,
        trim: true 
    },

    amount: { 
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


//export model to route
const checkout = mongoose.model("Checkout", CheckoutSchema);
module.exports = checkout;
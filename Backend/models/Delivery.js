// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826


const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({

    senderName: { 
        type: String,
        required: true,
        trim: true 
    },

    senderMobile: { 
        type: String,
        required: true,
        trim: true 
    },

    receiverName: { 
        type: String,
        required: true,
        trim: true 
    },

    receiverMobile: { 
        type: String,
        required: true,
        trim: true 
    },

    streetAddress: { 
        type: String,
        required: true,
        trim: true 
    },

    streetAddress2: { 
        type: String,
        required: false,
        trim: true 
    },

    city: { 
        type: String,
        required: true,
        trim: true 
    },

    province: { 
        type: String,
        required: true,
        trim: true 
    },

    postalCode: { 
        type: String,
        required: true,
        trim: true 
    },

    userId: {
        type: String,
        required: true,
        trim: true
    },

});

//export model to route
const delivery = mongoose.model("Delivery", DeliverySchema);
module.exports = delivery;
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({

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

const history = mongoose.model("History", HistorySchema);
module.exports = history;
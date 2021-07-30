const mongoose = require('mongoose');

const UserDeliverySchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Users'
    },
    streetAddress: {
        type: String,
        required: true,
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
        type: Number,
        required: true
    }
}) 

const UserDelivery = mongoose.model("UserDelivery", UserDeliverySchema);
module.exports = UserDelivery;
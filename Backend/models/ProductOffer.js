const mongoose = require('mongoose');

const ProductOfferSchema = new mongoose.Schema({
    productName: { 
        type: String,
        required: true,
        trim: true 
    },
    productPrice: { 
        type: Number,
        required: true,
        trim: true 
    },
    productDiscount: { 
        type: Number,
        required: true,
        trim: true 
    },
    categoryType: { 
        type: String 
    },
    productDescription: { 
        type: String,
        required: true,
        trim: true 
    },
    offerPrice: {
        type: Number,
        required: true
    },
    offerDiscount: {
        type: Number,
        required: true
    },
    offerDescription: {
        type: String,
        required: true
    }
});

const ProductOffer = mongoose.model("ProductOffers", ProductOfferSchema);
module.exports = ProductOffer;
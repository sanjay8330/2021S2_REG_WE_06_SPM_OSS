const mongoose = require('mongoose');

const ProductOfferSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Products'
    },
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
        required: true,
        trim: true,
    },
    offerEndDate: {
        type: String,
        required: true,
        trim: true
    }
});

const ProductOffer = mongoose.model("ProductOffers", ProductOfferSchema);
module.exports = ProductOffer;
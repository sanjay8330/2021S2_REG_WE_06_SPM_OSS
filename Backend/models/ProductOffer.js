const mongoose = require('mongoose');

const ProductOfferSchema = new mongoose.Schema({
    products : {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Products'
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
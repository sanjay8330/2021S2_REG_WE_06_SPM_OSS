const mongoose = require('mongoose');

const ProductOfferSchema = new mongoose.Schema({
    offerPrice: {
        type: Number,
        required: true
    }
});

const ProductOffer = mongoose.model("ProductOffers", ProductOfferSchema);
module.exports = ProductOffer;
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
    }
});

const ProductOffer = mongoose.model("ProductOffers", ProductOfferSchema);
module.exports = ProductOffer;
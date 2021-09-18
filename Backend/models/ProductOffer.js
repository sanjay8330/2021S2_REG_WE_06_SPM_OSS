/**
 * Product offer Model created to store the product offer details on the database
 * 
 * --scope - Product Offer Management
 * 
 * --author S.Sanjay
 *
 */ 

//Importing the mongoose from the installed package - mongoose@8.0.2
const mongoose = require('mongoose');

/**
 * Schema name (local) - ProductOfferSchema
 * 
 * Foreign key reference - product (field) references products (schema)
 */
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
    },
    offerStatus: {
        type: String,
        required: true,
        trim: true
    },
    productImage: { 
        type: String,
        required: false,
        trim: true 
    },
    productDescription: { 
        type: String,
        required: true,
        trim: true 
    },
    userCount: {
        type: Number,
        required: false,
        default: 0
    }

});


/**
 * Schema name on the database - ProductOffers
 * 
 * Exported model to be used on the ProductOffer route
 */
const ProductOffer = mongoose.model("ProductOffers", ProductOfferSchema);
module.exports = ProductOffer;
const router = require('express').Router();
const CheckoutModel = require('../models/Checkout');

//Add payment details
router.route('/paymentDetails').post(async (req, res) => {
    if(req.body){
        const Checkout = new CheckoutModel(req.body);
        await Checkout.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});
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

//Get payment history by userId and date - CUSTOMER PAYMENT HISTORY
router.route("/readHistoryForCustomer/:userId/:date").get(async (req, res) => {
    const userId = req.params.userId;
    const currentdate = req.params.date;

    CheckoutModel.find({ userID: userId, date: currentdate })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

module.exports = router;
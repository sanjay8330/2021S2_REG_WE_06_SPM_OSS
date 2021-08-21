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

//Get payment history by userId - CUSTOMER PAYMENT HISTORY
router.route("/readHistoryForCustomer/:userId/:date").get(async (req, res) => {
    const currentuserId = req.params.userId;
    const currentDate = req.params.date;

    CheckoutModel.find({ userId: currentuserId, date: currentDate })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

module.exports = router;
const router = require('express').Router();
const CheckoutModel = require('../models/Checkout');

//Add payment details
router.route('/paymentDetails/:userId/:amount').post(async (req, res) => {
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
router.route("/readHistoryForCustomer/:userId").get(async (req, res) => {
    const currentuserId = req.params.userId;
<<<<<<< HEAD
    //const currentDate = req.params.date;
=======
>>>>>>> ab85ea6bd36e7f8750c5d0b8f76539d13f64878b

    CheckoutModel.find({ userId: currentuserId})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
}); 

module.exports = router;
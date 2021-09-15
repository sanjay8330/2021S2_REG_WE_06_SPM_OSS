const router = require('express').Router();
const HistoryModel = require('../models/Checkout');

//show payment history
router.route('/payment-history/:id').get(async (req, res) => {

    const userId = req.params.id;

    HistoryModel.find({ userId: userId })
    .then(data => {
        res.status(200).send({ data: data });
    }).catch(error => {
        res.status(500).send({ error: error });
    })
});

//Delete payment details
router.route('/deletePayment/:id').delete(async (req, res) => {
    if(req.params && req.params.id){
        await HistoryModel.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Get payment record by Id
router.route("/readHistoryForCustomer/:userId").get(async (req, res) => {
    const currentuserId = req.params.userId;

    CheckoutModel.find({ userId: currentuserId})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
}); 

module.exports = router;
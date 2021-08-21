const router = require('express').Router();
const HistoryModel = require('../models/Checkout');

//Add payment details
router.route('/payment-history/:id').get(async (req, res) => {

    const userId = req.params.id;

    HistoryModel.find({ userId: userId })
    .then(data => {
        res.status(200).send({ data: data });
    }).catch(error => {
        res.status(500).send({ error: error });
    })
});

module.exports = router;
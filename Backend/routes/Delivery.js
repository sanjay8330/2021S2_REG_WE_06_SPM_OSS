const router = require('express').Router();
const DeliveryModel = require('../models/Delivery');

//Add delivery details
router.route('/deliveryDetails').post(async (req, res) => {
    if(req.body){
        const Delivery = new DeliveryModel(req.body);
        await Delivery.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});


//Get delivery by userId - CUSTOMER PAYMENT HISTORY
router.route("/deliveryForCustomer/:userId").get(async (req, res) => {
    const currentuserId = req.params.userId;

    DeliveryModel.find({ userId: currentuserId})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
}); 

module.exports = router;
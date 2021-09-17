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


//Get delivery by userId 
router.route("/deliveryForCustomer/:userId").get(async (req, res) => {
    const currentuserId = req.params.userId;

    DeliveryModel.find({ userId: currentuserId})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
}); 


//Update delivery details  - USER TASK
router.route("/updateDeliveryDetail/:id").put(async (req, res) => {
    //Updating the details
    const senderName = req.body.senderName;
    const senderMobile = req.body.senderMobile;
    const receiverName = req.body.receiverName;
    const receiverMobile = req.body.receiverMobile;
    const streetAddress = req.body.streetAddress;
    const streetAddress2 = req.body.streetAddress2;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    const userId = req.body.userId;
    const amount = req.body.amount;

    // ID
    const Id = req.params.id;

    try {
        await DeliveryModel.findById(Id, (err, updateDeliveryObject) => {
            updateDeliveryObject.senderName = senderName;
            updateDeliveryObject.senderMobile = senderMobile;
            updateDeliveryObject.receiverName = receiverName;
            updateDeliveryObject.receiverMobile = receiverMobile;
            updateDeliveryObject.streetAddress = streetAddress;
            updateDeliveryObject.streetAddress2 = streetAddress2;
            updateDeliveryObject.city = city;
            updateDeliveryObject.province = province;
            updateDeliveryObject.postalCode = postalCode;
            updateDeliveryObject.userId = userId;
            updateDeliveryObject.amount = amount;

            updateDeliveryObject.save()
                .then(data => {
                    res.status(200).send({ data: data });
                }).catch(error => {
                    res.status(500).send({ error: error });
                })
        });
    } catch (err) {
        console.log(err);
    }
});


//View delivery by userId 
router.route("/viewDeliveryDetails/:userId/:amount").get(async (req, res) => {
    const currentuserId = req.params.userId;

    DeliveryModel.find({ userId: currentuserId})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
}); 

module.exports = router;
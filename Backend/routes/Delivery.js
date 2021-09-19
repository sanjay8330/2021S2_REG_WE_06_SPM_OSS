// ----------------------------
//     Delivery ROUTE - BACKEND
// ----------------------------


// Function : Payment Management
// Name : D.P. Kavindi Gimshani
// Student Number : IT19150826


const router = require('express').Router();
const DeliveryModel = require('../models/Delivery');

//Add delivery details - USER TASK  
//API : http://localhost:3001/delivery/deliveryDetails/${this.props.match.params.userId}
router.route('/deliveryDetails/:userId').post(async (req, res) => {
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

//Update delivery details - USER TASK
//API : http://localhost:3001/delivery/updateDeliveryDetail/${this.state.deliveryID}
router.route("/updateDeliveryDetail/:id").put(async (req, res) => {
    //Updating the offer details
    const senderName = req.body.senderName;
    const senderMobile = req.body.senderMobile;
    const receiverName = req.body.receiverName;
    const receiverMobile = req.body.receiverMobile;
    const streetAddress = req.body.streetAddress;
    const streetAddress2 = req.body.streetAddress2;
    const province = req.body.province;
    const city = req.body.city;
    const postalCode = req.body.postalCode;
    const userId = req.body.userId;
    const amount = req.body.amount;

    //Offer ID
    const Id = req.params.id;

    try {
        await DeliveryModel.findById(Id, (err, updatedDeliveryObject) => {
            updatedDeliveryObject.senderName = senderName;
            updatedDeliveryObject.senderMobile = senderMobile;
            updatedDeliveryObject.receiverName = receiverName;
            updatedDeliveryObject.receiverMobile = receiverMobile;
            updatedDeliveryObject.streetAddress = streetAddress;
            updatedDeliveryObject.streetAddress2 = streetAddress2;
            updatedDeliveryObject.province = province;
            updatedDeliveryObject.city = city;
            updatedDeliveryObject.postalCode = postalCode;
            updatedDeliveryObject.userId = userId;
            updatedDeliveryObject.amount = amount;

            updatedDeliveryObject.save()
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


//Get delivery by userId for update - USER TASK
//API : http://localhost:3001/delivery/deliveryForCustomer/${this.props.match.params.userId}
router.route("/deliveryForCustomer/:userId").get(async (req, res) => {
    const currentuserId = req.params.userId;

    DeliveryModel.find({ userId: currentuserId})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
}); 

//View delivery by userId - USER TASK
//API : http://localhost:3001/delivery/viewDeliveryDetails/${this.props.match.params.userId}/${this.props.match.params.amount}
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
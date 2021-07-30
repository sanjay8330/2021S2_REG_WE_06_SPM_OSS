const router = require('express').Router();
const UserDeliveryModel = require('../models/UserDelivery');

//Add a user delivery address - GENEREAL USER TASK
router.route('/addUserDelivery').post(async (req, res) => {
    if(req.body){
        const UserDelivery = new UserDeliveryModel(req.body);
        await UserDelivery.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Get the user delivery details by ID - GENERAL USER & ADMIN TASK
router.route('/getUserDeliveryById/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await UserDeliveryModel.findById(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Update the delivery details - GENERAL USER TASK
router.route("/updateDeliveryDetails/:id").put(async (req, res) => {
    const streetAddress = req.body.streetAddress;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    
    //User ID
    const Id = req.params.id;

    try{
        await UserDeliveryModel.findById(Id, (err, updatedUserDeliveryObject) => {
            updatedUserDeliveryObject.streetAddress = streetAddress; 
            updatedUserDeliveryObject.city = city;
            updatedUserDeliveryObject.province = province;
            updatedUserDeliveryObject.postalCode = postalCode;
   
            updatedUserDeliveryObject.save()
            .then(data => {
                res.status(200).send({data: data});
            }).catch(error => {
                res.status(500).send({error: error});
            })
        });
    }catch(err){
        console.log(err);
    }
});


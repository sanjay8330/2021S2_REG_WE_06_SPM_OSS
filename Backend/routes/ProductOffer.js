const router = require('express').Router();
const { response } = require('express');
const ProductOfferModel = require('../models/ProductOffer');

//Create a new offer for a product - ADMINISTRATOR/SUPPLIER
router.route('/addProductOffer').post(async (req, res) => {
    if(req.body){
        
        const ProductOffer = new ProductOfferModel(req.body);
        await ProductOffer.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Get all product offers - ADMINISTRATOR/SUPPLIER
router.route('/getAllProductOffers').get(async (req, res) => {
    await ProductOfferModel.find({})
    .then(data => {
        res.status(200).send({data: data});
    }).catch(error => {
        res.status(500).send({error: error});
    })
});

//Get the product offer by ID - ADMIN TASK
router.route('/getProductOfferById/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await ProductOfferModel.findById(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Update Product Offer - ADMIN TASK
router.route("/updateProductOffer/:id").put(async (req, res) => {
    //Updating the offer details
    const offerPrice = req.body.offerPrice;
    const offerDiscount = req.body.offerDiscount;
    const offerDescription = req.body.offerDescription;

    //Offer ID
    const Id = req.params.id;

    try{
        await ProductOfferModel.findById(Id, (err, updatedProductOfferObject) => {
            updatedProductOfferObject.offerPrice = offerPrice;
            updatedProductOfferObject.offerDiscount = offerDiscount;
            updatedProductOfferObject.offerDescription = offerDescription;

            updatedProductOfferObject.save()
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

//Delete product offer - ADMIN TASK
router.route('/deleteProductOffer/:id').delete(async (req, res) => {
    if(req.params && req.params.id){
        await ProductOfferModel.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});


module.exports = router;
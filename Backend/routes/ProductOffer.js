/**
 * Routes (API) for Products offers created to use API on the front end to perform
 * all opertaions related to product offers
 * 
 * --scope - Product Offer Management
 * --Implemented APIs'  - ADD PRODUCT OFFER               | GET ALL PRODUCT OFFERS      |  GET PRODUCT OFFER BY ID
 *                        UPDATE PRODUCT OFFERS           | CHANGE PRODUCT OFFER STATUS | DELETE PRODUCT OFFER
 *                        GET PRODUCT OFFER BY PRODUCT ID | GET ACTIVE PRODUCT OFFERS   | GET INACTIVE PRODUCT OFFERS
 *                        CHANGE USER COUNT FOR PRODUCT OFFERS 
 * 
 * --author S.Sanjay
 *
 */
const router = require('express').Router();
const { response } = require('express');

/**
 * Imported Product Offer Model - ProductOffer.js - MODEL
 */
const ProductOfferModel = require('../models/ProductOffer');

/**
 * API DESC      - Create a new Product Offer
 * API           - http://localhost:3001/productOffer/addProductOffer
 * TARGET IMPACT - Add new product offers page | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> addProductOffer.js  
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/addProductOffer').post(async (req, res) => {
    if (req.body) {

        const ProductOffer = new ProductOfferModel(req.body);
        await ProductOffer.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Get all created Product Offer
 * API           - http://localhost:3001/productOffer/getAllProductOffers
 * TARGET IMPACT - View all product offers page | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> viewProductOffer.js
 *                                                FRONTEND -> SRC-> COMPONENTS -> home.js   
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/getAllProductOffers').get(async (req, res) => {
    await ProductOfferModel.find({})
        .populate('product', 'productName')
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - Get Product Offer by product offer ID
 * API           - http://localhost:3001/productOffer/getProductOfferById/<OFFERID>
 * TARGET IMPACT - View product offer page | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> updateProductOffer.js 
 *                                           FRONTEND -> SRC-> home.js 
 * TARGET USER   - Administrator (Supplier), Customer (General User)
 */
router.route('/getProductOfferById/:id').get(async (req, res) => {
    if (req.params && req.params.id) {
        await ProductOfferModel.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Update Product Offer details by product offer ID
 * API           - http://localhost:3001/productOffer/updateProductOffer/<OFFERID>
 * TARGET IMPACT - Update product offer page | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> updateProductOffer.js 
 * TARGET USER   - Administrator (Supplier)
 */
router.route("/updateProductOffer/:id").put(async (req, res) => {
    //Updating the offer details - VALUES FROM FRONTEND
    const offerPrice = req.body.offerPrice;
    const offerDiscount = req.body.offerDiscount;
    const offerDescription = req.body.offerDescription;
    const offerEndDate = req.body.offerEndDate;
    const offerStatus = req.body.offerStatus;

    //Product Offer ID - ROUTE PARAMETER
    const Id = req.params.id;

    try {
        await ProductOfferModel.findById(Id, (err, updatedProductOfferObject) => {
            updatedProductOfferObject.offerPrice = offerPrice;
            updatedProductOfferObject.offerDiscount = offerDiscount;
            updatedProductOfferObject.offerDescription = offerDescription;
            updatedProductOfferObject.offerEndDate = offerEndDate;
            updatedProductOfferObject.offerStatus = offerStatus;

            updatedProductOfferObject.save()
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

/**
 * API DESC      - Change the Product Offer status by using product offer ID
 * API           - http://localhost:3001/productOffer/changeProductOfferStatus/<OFFERID>
 * TARGET IMPACT - Update product offer page | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> updateProductOffer.js 
 * TARGET USER   - Administrator (Supplier)
 */
router.route("/changeProductOfferStatus/:id").put(async (req, res) => {
    //Updating the offer status - RECIEVED FROM FRONTEND
    const offerStatus = req.body.offerStatus;

    //Product Offer ID - ROUTE PARAMETER
    const Id = req.params.id;

    try {
        await ProductOfferModel.findById(Id, (err, updatedProductOfferObject) => {
            updatedProductOfferObject.offerStatus = offerStatus;

            updatedProductOfferObject.save()
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

/**
 * API DESC      - Delete the Product Offer status by using product offer ID
 * API           - http://localhost:3001/productOffer/deleteProductOffer/<OFFERID>
 * TARGET IMPACT - Delete product offer page | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> deleteProductOffer.js 
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/deleteProductOffer/:id').delete(async (req, res) => {
    if (req.params && req.params.id) {
        await ProductOfferModel.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Get the Product Offer status by using product ID
 * API           - http://localhost:3001/productOffer/getProductOfferByproductId/<PRODUCTID>
 * TARGET IMPACT - View product offer for a product | FRONTEND -> SRC-> COMPONENTS -> PRODUCTMANAGEMENT -> deleteProduct.js 
 *                                                    FRONTEND -> SRC-> COMPONENTS -> PRODUCTMANAGEMENT -> deleteProductWithOffer.js 
 *                                                    FRONTEND -> SRC-> home.js 
 * TARGET USER   - Administrator (Supplier), Customer (General User)
 */
router.route('/getProductOfferByproductId/:id').get(async (req, res) => {
    if (req.params && req.params.id) {
        await ProductOfferModel.find({ product: req.params.id })
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - View all active Product Offers
 * API           - http://localhost:3001/productOffer/getAllActiveProductOffers
 * TARGET IMPACT - Get all active product offer page | FRONTEND -> SRC-> home.js
 *                                                     FRONTEND -> SRC-> adminDashboard.js
 * TARGET USER   - Administrator (Supplier), Customer (General User)
 */
router.route('/getAllActiveProductOffers').get(async (req, res) => {
    await ProductOfferModel.find({ offerStatus: 'Active' })
        .populate('product', 'productName')
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - View all in-active Product Offers
 * API           - http://localhost:3001/productOffer/getAllInActiveProductOffers
 * TARGET IMPACT - Get all active product offer page | FRONTEND -> SRC-> adminDashboard.js                                                   
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/getAllInActiveProductOffers').get(async (req, res) => {
    await ProductOfferModel.find({ offerStatus: 'In-Active' })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - Change the user count to track the users purchased product with the product offer
 * API           - http://localhost:3001/productOffer/changeUserCount/<OFFERID>
 * TARGET IMPACT - Track the user count | FRONTEND -> SRC-> COMPONENTS -> PRODUCTOFFER -> viewProductOffer.js                                                  
 * TARGET USER   - Administrator (Supplier) | GENERATE REPORT
 */
router.route("/changeUserCount/:id").put(async (req, res) => {
    //ADDING THE USER COUNT BY 1 ONCE PRODUCT WITH PRODUCT OFFER IS PURCHASED
    const userCount = req.body.userCount;

    //Product Offer ID - ROUTE PARAMETER
    const Id = req.params.id;

    try {
        await ProductOfferModel.findById(Id, (err, updatedProductOfferObject) => {
            updatedProductOfferObject.userCount = userCount;

            updatedProductOfferObject.save()
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


module.exports = router;
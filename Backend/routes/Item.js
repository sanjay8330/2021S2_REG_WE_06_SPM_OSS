const router = require('express').Router();
const ItemModel = require('../models/Item');

//Add a Item 
router.route('/addItem').post(async (req, res) => {
    if (req.body) {
        const Item = new ItemModel(req.body);
        await Item.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

//Get item by userId and date - CUSTOMER SHOPPING CART
router.route("/readItemsForCustomer/:userId/:date").get(async (req, res) => {
    const userId = req.params.userId;
    const currentdate = req.params.date;

    ItemModel.find({ userID: userId, date: currentdate })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

//Get the product by ID - ADMIN TASK
router.route('/getItemById/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await ItemtModel.findById(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Update Product  - ADMIN TASK
router.route("/updateitem/:id").put(async (req, res) => {
    //Updating the product details
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productDiscount = req.body.productDiscount;
    const productDescription = req.body.productDescription;
    const categoryType = req.body.categoryType;
    const productImage = req.body.productImage;

    //Offer ID
    const Id = req.params.id;

    try {
        await ProductModel.findById(Id, (err, updatedProductObject) => {
            updatedProductObject.productName = productName;
            updatedProductObject.productPrice = productPrice;
            updatedProductObject.productDiscount = productDiscount;
            updatedProductObject.productDescription = productDescription;
            updatedProductObject.categoryType = categoryType;
            updatedProductObject.productImage = productImage;

            updatedProductObject.save()
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
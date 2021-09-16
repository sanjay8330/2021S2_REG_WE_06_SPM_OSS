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


//Get the item by ID - USER TASK
router.route('/getItemById/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await ItemModel.findById(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Update Item  - USER TASK
router.route("/updateitem/:id").put(async (req, res) => {
    //Updating the item details
    const itemQuantity = req.body.itemQuantity;
    const itemColor = req.body.itemColor;
    const itemSize = req.body.itemSize;

    //Offer ID
    const Id = req.params.id;

    try {
        await ItemModel.findById(Id, (err, updateItemObject) => {
            updateItemObject.productQuantity = itemQuantity;
            updateItemObject.productColor = itemColor;
            updateItemObject.productSize = itemSize;
            updateItemObject.save()
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

//Delete the Item - USER TASK
router.route('/deleteItem/:id').delete(async (req, res) => {
    if(req.params && req.params.id){
        await ItemModel.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});


module.exports = router;
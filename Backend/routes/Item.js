const router = require('express').Router();

//Imported Item Model
const ItemModel = require('../models/Item');

// ----------------------------
//     ITEM ROUTE - BACKEND
// ----------------------------

//Function - Shopping Cart management
//Student name - Ekanayake K.L.W
//Student ID - IT19150758

//Add a Item 
/**Add a new item - USER TASK
 * API - http://localhost:3001/insertitem/addItem
*/
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


/**Get item by userId and date - CUSTOMER SHOPPING CART
 * API - http://localhost:3001/insertitem/readItemsForCustomer/${this.props.match.params.userId}/${date}
*/
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



/**GET AN ITEM - USER TASK
 * API - http://localhost:3001/insertitem/getItemById/${this.props.match.params.id
*/

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

/**
//Update Item  - USER TASK
 * API - http://localhost:3001/insertitem/updateitem/${this.props.match.params.id
*/
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


/**
//Delete the Item - USER TASK
 * API - http://localhost:3001/insertitem/deleteItem/${this.props.match.params.id
*/
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
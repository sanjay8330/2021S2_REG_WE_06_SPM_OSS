const router = require('express').Router();
const ItemModel = require('../models/Item');

//Add a Item 
router.route('/addItem').post(async (req, res) => {
    if(req.body){
        const Item = new ItemModel(req.body);
        await Item.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

module.exports = router;
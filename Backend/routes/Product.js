const router = require('express').Router();
const ProductModel = require('../models/Product');

//Add a product - ADMIN TASK
router.route('/addProduct').post(async (req, res) => {
    if(req.body){
        const Product = new ProductModel(req.body);
        await Product.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Get all products - ADMIN TASK
router.route('/getAllProducts').get(async (req, res) => {
    await ProductModel.find({})
    .populate('product', 'productName')
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

//Get the product by ID - ADMIN TASK
router.route('/getProductById/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await ProductModel.findById(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Delete the product - ADMIN TASK
router.route('/deleteProduct/:id').delete(async (req, res) => {
    if(req.params && req.params.id){
        await ProductModel.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

module.exports = router;
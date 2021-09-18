// ----------------------------
//     PRODUCT ROUTE - BACKEND
// ----------------------------

//Function - Product management
//Student name - H.M. Kasuni Navodya
//Student ID - IT19144986

const router = require('express').Router();

//Imported Product Model
const ProductModel = require('../models/Product');

/**Add a new product - ADMIN TASK
 * API - http://localhost:3001/product/addProduct
*/
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

/**Get all created products - ADMIN TASK
 * API - http://localhost:3001/product/getAllProducts
*/ 
router.route('/getAllProducts').get(async (req, res) => {
    await ProductModel.find({})
    .populate('product', 'productName')
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**Get the product by product ID - ADMIN TASK
 * API - http://localhost:3001/product/getProductById/<productID>
 * */
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

/**Update Product details by using product ID - ADMIN TASK
*  API - http://localhost:3001/product/updateProduct/<productID>
*/
router.route("/updateProduct/:id").put(async (req, res) => {
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

/**Delete the product by using product ID - ADMIN TASK
*  API - http://localhost:3001/product/deleteProduct/<productID>
*/
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

/**Get all products on men category - CUSTOMER TASK
*  API - http://localhost:3001/product/getAllMenProducts
*/
router.route('/getAllMenProducts').get(async (req, res) => {
    await ProductModel.find({categoryType: 'Men'})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**Get all products on women category - CUSTOMER TASK
*  API - http://localhost:3001/product/getAllWomenProducts
*/
router.route('/getAllWomenProducts').get(async (req, res) => {
    await ProductModel.find({categoryType: 'Women'})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**Get all products on kids category - CUSTOMER TASK
*  API - http://localhost:3001/product/getAllKidsProducts
*/
router.route('/getAllKidsProducts').get(async (req, res) => {
    await ProductModel.find({categoryType: 'Kids'})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**Get all products on Babies category - CUSTOMER TASK
*  API - http://localhost:3001/product/getAllBabiesProducts
*/
router.route('/getAllBabiesProducts').get(async (req, res) => {
    await ProductModel.find({categoryType: 'Babies'})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**Get all products on Teenagers category - CUSTOMER TASK
*  API - http://localhost:3001/product/getAllTeenagersProducts
*/
router.route('/getAllTeenagersProducts').get(async (req, res) => {
    await ProductModel.find({categoryType: 'Teenagers'})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

module.exports = router;
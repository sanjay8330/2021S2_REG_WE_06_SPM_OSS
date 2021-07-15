const router = require('express').Router();
const UserModel = require('../models/User');

//Add a user - GENEREAL USER TASK & ADMIN TASK
router.route('/addUser').post(async (req, res) => {
    if(req.body){
        const User = new UserModel(req.body);
        await User.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Get all users - ADMIN TASK
router.route('/getAllUsers').get(async (req, res) => {
    await UserModel.find({})
    .then(data => {
        res.status(200).send({data: data});
    }).catch(error => {
        res.status(500).send({error: error});
    })
});

//Get the user by ID - GENERAL USER & ADMIN TASK
router.route('/getUserById/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await UserModel.findById(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Get the user by email address - General User Task
router.route('/getUserByEmailID/:id').get(async (req, res) => {
    if(req.params && req.params.id){
        await UserModel.find({userEmail: req.params.id })
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Delete the user - ADMIN TASK
router.route('/deleteUser/:id').delete(async (req, res) => {
    if(req.params && req.params.id){
        await UserModel.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

//Validate the user - ALL USERS TASK
router.route('/validateUser/:emailID').get(async (req, res) => {
    if(req.params && req.params.emailID){
        await UserModel.find({userEmail: req.params.emailID })
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
})

//Reset the password - GENERAL USER TASK
router.route("/resetPassword/:id").put(async (req, res) => {
    const newPassword = req.body.newPassword;
    //Research paper or workshop ID
    const Id = req.params.id;

    try{
        await UserModel.findById(Id, (err, updatedUserObject) => {
            updatedUserObject.userPassword = newPassword;
            updatedUserObject.save()
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

module.exports = router;
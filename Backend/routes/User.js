/**
 * Routes (API) for Users created to use API on the front end to perform
 * all opertaions related to users
 * 
 * --scope - User Management
 * --Implemented APIs'  - ADD USER          | GET ALL USERS  | GET ALL ADMINISTRATORS
 *                        GET ALL CUSTOMERS | GET USER BY ID | GET USER BY EMAIL ID
 *                        DELETE USER       | VALIDATE USER  | RESET PASSWORD
 *                        UPDATE PASSWORD 
 * 
 * --author S.Sanjay
 *
 */

const router = require('express').Router();


/**
 * Imported User Model - User.js - MODEL
 */
const UserModel = require('../models/User');

/**
 * API DESC      - Register to the application
 * API           - http://localhost:3001/user/addUser
 * TARGET IMPACT - Sign up page | FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> registerUsers.js  
 *                                FRONTEND -> SRC-> COMPONENTS -> USERMANAGEMENT -> register.js  
 * TARGET USER   - Administrator (Supplier), Customer (General user)
 */
router.route('/addUser').post(async (req, res) => {
    if (req.body) {

        const User = new UserModel(req.body);
        await User.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - View all customers and administrators to the application
 * API           - http://localhost:3001/user/getAllUsers
 * TARGET IMPACT - View all users page |  FRONTEND -> SRC-> COMPONENTS -> USERMANAGEMENT -> login.js                        
 * TARGET USER   - Administrator (Supplier), Customer (General user)
 */
router.route('/getAllUsers').get(async (req, res) => {
    await UserModel.find({})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - View all administrators of the application
 * API           - http://localhost:3001/user/getAllAdministrators
 * TARGET IMPACT - View all adminsitrators page |  FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> viewAdmins.js                        
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/getAllAdministrators').get(async (req, res) => {
    await UserModel.find({ userCategory: 'Administrator' })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - View all customers of the application
 * API           - http://localhost:3001/user/getAllAdministrators
 * TARGET IMPACT - View all customers page |  FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> viewUsers.js                        
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/getAllCustomers').get(async (req, res) => {
    await UserModel.find({ userCategory: 'Customer' })
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error });
        })
});

/**
 * API DESC      - Get User by the UserID
 * API           - http://localhost:3001/user/getUserById/<USERID>
 * TARGET IMPACT - View user page | FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> updateUsers.js    
 *                                  FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> updateUserPassword.js  
 *                                  FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> deleteUsers.js 
 *                                  FRONTEND -> SRC-> COMPONENTS -> USERMANAGEMENT -> updateUsers.js
 *                                  FRONTEND -> SRC-> COMPONENTS -> USERMANAGEMENT -> updateUserProfilePassword.js                     
 * TARGET USER   - Administrator (Supplier), Customer (General User)
 */
router.route('/getUserById/:id').get(async (req, res) => {
    if (req.params && req.params.id) {
        await UserModel.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Get the user details by user ID
 * API           - http://localhost:3001/user/getUserByEmailID/<USERID>
 * TARGET IMPACT - Home page |  FRONTEND -> SRC-> home.js                      
 * TARGET USER   - Customer (General User)
 */
router.route('/getUserByEmailID/:id').get(async (req, res) => {
    if (req.params && req.params.id) {
        await UserModel.find({ userEmail: req.params.id })
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Delete Users
 * API           - http://localhost:3001/user/deleteUser/<USERID>
 * TARGET IMPACT - View all Users page |  FRONTEND -> SRC-> COMPONENT -> ADMINISTRATOR -> deleteUsers.js                    
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/deleteUser/:id').delete(async (req, res) => {
    if (req.params && req.params.id) {
        await UserModel.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
});

/**
 * API DESC      - Validate Users to authenticate users to the application
 * API           - http://localhost:3001/user/validateUser/<EMAILID>
 * TARGET IMPACT - Login page |  FRONTEND -> SRC-> COMPONENT -> USERMANAGEMENT -> login.js                    
 * TARGET USER   - Administrator (Supplier), CUstomer (General User)
 */
router.route('/validateUser/:emailID').get(async (req, res) => {
    if (req.params && req.params.emailID) {
        await UserModel.find({ userEmail: req.params.emailID })
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error });
            })
    }
})

/**
 * API DESC      - Reset password of Users to authenticate users to the application
 * API           - http://localhost:3001/user/resetPassword/<USERID>
 * TARGET IMPACT - Reset Password page |  FRONTEND -> SRC-> COMPONENT -> USERMANAGEMENT -> resetPassword.js  
 *                                        FRONTEND -> SRC-> COMPONENT -> ADMINISTRATOR -> updateUserPassword.js                    
 * TARGET USER   - Administrator (Supplier), Customer (General User)
 */
router.route("/resetPassword/:id").put(async (req, res) => {
    //New password given by user - RECIEVED FROM FRONTEND
    const newPassword = req.body.newPassword;
    
    //User ID - ROUTE PARAMETER
    const Id = req.params.id;

    try {
        await UserModel.findById(Id, (err, updatedUserObject) => {
            updatedUserObject.userPassword = newPassword;
            updatedUserObject.save()
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
 * API DESC      - Update the User details
 * API           - http://localhost:3001/user/resetPassword/<USERID>
 * TARGET IMPACT - Edit Profile page |  FRONTEND -> SRC-> COMPONENT -> USERMANAGEMENT -> updateUser.js  
 *                                      FRONTEND -> SRC-> COMPONENT -> ADMINISTRATOR -> updateUsers.js                    
 * TARGET USER   - Administrator (Supplier), Customer (General User)
 */
router.route("/updateUser/:id").put(async (req, res) => {
    //Updating the User details - RECIEVED FROM THE FRONTEND
    const userFullName = req.body.userFullName;
    const userEmail = req.body.userEmail;
    const userContact = req.body.userContact;
    const imageURL = req.body.imageURL;
    const resetAnswer = req.body.resetAnswer;

    //User ID - ROUTE PARAMETER
    const Id = req.params.id;

    try {
        await UserModel.findById(Id, (err, updatedUserObject) => {
            updatedUserObject.userFullName = userFullName;
            updatedUserObject.userEmail = userEmail;
            updatedUserObject.userContact = userContact;
            updatedUserObject.imageURL = imageURL;
            updatedUserObject.resetAnswer = resetAnswer;

            updatedUserObject.save()
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
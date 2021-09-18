/**
 * Routes (API) for User Reports created to use API on the frontend to generate reports
 * 
 * --scope - User Management
 * --Implemented APIs'  - ADD USER REPORT | GET ALL USER REPORTS 
 * 
 * --author S.Sanjay
 *
 */

const router = require('express').Router();

/**
 * Imported User Report Model - UserReport.js - MODEL
 */
const UserReportModel = require('../models/UserReport');

/**
 * API DESC      - Add user transaction
 * API           - http://localhost:3001/userreport/addUserReport
 * TARGET IMPACT - No Specific Page | FRONTEND -> SRC-> COMPONENT -> USERMANAGEMENT -> login.js
 *                                    FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> updateUsers.js    
    *                                 FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> updateUserPassword.js  
    *                                 FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> deleteUsers.js 
    *                                 FRONTEND -> SRC-> COMPONENTS -> USERMANAGEMENT -> updateUsers.js
    *                                 FRONTEND -> SRC-> COMPONENTS -> USERMANAGEMENT -> updateUserProfilePassword.js     
 * TARGET USER   - Administrator (Supplier), Customer (General user)
 */
router.route('/addUserReport').post(async (req, res) => {
    if(req.body){
        const UserReport = new UserReportModel(req.body);
        await UserReport.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
    }
});

/**
 * API DESC      - Add user transaction
 * API           - http://localhost:3001/userreport/addUserReport
 * TARGET IMPACT - View Users Page | FRONTEND -> SRC-> COMPONENTS -> ADMINISTRATOR -> viewUsers.js                         
 * TARGET USER   - Administrator (Supplier)
 */
router.route('/getAllUserReports').get(async (req, res) => {
        await UserReportModel.find({})
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
});

module.exports = router;


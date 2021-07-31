const router = require('express').Router();
const UserReportModel = require('../models/UserReport');

//Add a user delivery address - GENEREAL USER TASK
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

//Get the user delivery details by ID - GENERAL USER & ADMIN TASK
router.route('/getAllUserReports').get(async (req, res) => {
        await UserReportModel.find({})
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error});
        })
});

module.exports = router;


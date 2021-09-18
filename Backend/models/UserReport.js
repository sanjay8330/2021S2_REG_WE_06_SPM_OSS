/**
 * User Report Model created to store the user transaction on the database
 * 
 * --scope - User Management
 * --specific - LOGIN, RESET PASSWORD, REGISTER
 * 
 * --author S.Sanjay
 *
 */

//Importing the mongoose from the installed package - mongoose@8.0.2
const mongoose = require('mongoose');

/**
 * Schema name (local) - UserReportSchema
 * 
 * Foreign key reference - None
 */
const UserReportSchema = new mongoose.Schema({
    userEmail : {
        type: String,
        required: true,
        trim: true
    },
    userCategory: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    action: {
        type: String,
        required: true,
        trim: true
    },
    datetime: {
        type: String,
        required: true,
        trim: true
    }
}) 

/**
 * Schema name on the database - UserReport
 * 
 * Exported model to be used on the UserReport route
 * 
 */
const UserReport = mongoose.model("UserReport", UserReportSchema);
module.exports = UserReport;
/**
 * User Model created to store the user details on the database
 * 
 * --scope - User Management
 * 
 * --author S.Sanjay
 *
 */

//Importing the mongoose from the installed package - mongoose@8.0.2
const mongoose = require('mongoose');

/**
 * Schema name (local) - UserSchema
 * 
 * Foreign key reference - None
 */
const UserSchema = new mongoose.Schema({
    userFullName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: { 
        type: String,
        required: true,
        trim: true
    },
    userPassword: {
        type: String,
        required: true,
        trim: true
    },
    userContact: {
        type: String,
        required: true,
        trim: true
    },
    imageURL: {
        type: String,
        required:false,
        trim: true
    },
    userCategory: {
        type: String,
        required: true,
        trim: true
    },
    resetAnswer: {
        type: Number,
        required: true
    },
});

/**
 * Schema name on the database - Users
 * 
 * Exported model to be used on the User route
 */
const User = mongoose.model("Users", UserSchema);
module.exports = User;
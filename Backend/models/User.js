const mongoose = require('mongoose');

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
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;
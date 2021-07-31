const mongoose = require('mongoose');

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

const UserReport = mongoose.model("UserReport", UserReportSchema);
module.exports = UserReport;
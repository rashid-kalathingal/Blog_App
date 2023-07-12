const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    adminname : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        min: 6,
    },   
},{timestamps: true})

module.exports = mongoose.model('Admin', AdminSchema)

// timestamps will give updatedAt and createdAt
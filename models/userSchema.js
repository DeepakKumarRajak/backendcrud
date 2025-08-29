const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    mobile: {
        type:Number,
        required:true
    },
    post: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    }
});

const users = new mongoose.model("users",userSchema);

module.exports = users;
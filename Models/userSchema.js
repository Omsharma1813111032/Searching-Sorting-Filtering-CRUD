const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname:{type:String,required:true,trim:true},
    lname:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true,minlength:10,maxlength:10},
    profile:{type:String},
    gender:{type:String,required:true},
    status:{type:String,required:true},
    location:{type:String,required:true},
    datecreated:Date,
    dateupdated:Date
})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel
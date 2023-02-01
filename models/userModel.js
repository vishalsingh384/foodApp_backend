const express= require('express');
const mongoose=require('mongoose');
const {db_link}=require('../secrets');;
const emailValidator=require("email-validator");
const bcrypt=require("bcrypt");
const { v4: uuidv4 } = require('uuid');
mongoose.set('strictQuery',false);
mongoose.connect(db_link)
    .then(function(db){
        console.log("user db connected");
        // console.log(db);
    })
    .catch(function (err){
        console.log(err);
    });


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    confirmPassword:{
        type:String,
        // required:true,
        minLength:6,
        validate: function(){
            return this.confirmPassword==this.password; 
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliverboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpg'
    },
    resetToken:{
        type:String
    }
});

userSchema.methods.createResetToken=async function(){
    const resetToken=uuidv4();
    this.resetToken=resetToken;
    await this.save();
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}


// Learning Hooks
// userSchema.pre('save',function(){
//     console.log("Pre");
// });

// userSchema.post('save',function(){
//     console.log("Post");
// });


userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

// userSchema.pre('save', async function(){
//     let salt=await bcrypt.genSalt();
//     // console.log(salt+"<<--");
//     let hashedString=await bcrypt.hash(this.password,salt);
//     // console.log(hashedString);
//     this.password=hashedString;
// })


// (async function createUser(){
//     let user={
//         name:"Singh",
//         email:"abc@gmail.com",
//         password:"123456",
//         confirmPassword:"123456"
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })(); --> An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined





//models                        //model_name    //on_which_schema
const userModel=mongoose.model("userModel",userSchema);
// A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

module.exports=userModel;

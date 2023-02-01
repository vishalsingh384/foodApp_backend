const { json } = require('express');
const express= require('express');
const authRouter=express.Router();
const userModel=require('../models/userModel');
var jwt=require('jsonwebtoken');
const JWT_KEY='slidfu212875hefr77dwrssn0ijfr985';

// authRouter
// .route('/signup')
// .get(getSignUp)
// .post(postSignUp)

// authRouter
// .route('/login')
// .post(loginUser)

module.exports=authRouter;

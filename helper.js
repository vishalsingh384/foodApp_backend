var jwt=require('jsonwebtoken');
const userModel = require('./models/userModel');
const {JWT_KEY}=require('./secrets');

module.exports.protectRoute=async function (req,res,next){
    let token;
    if(req.cookies.login){
        token=req.cookies.login;
        let payloadObj=jwt.verify(token,JWT_KEY);//jwt.verify return payload
        const user=await userModel.findById(payloadObj.payload);
        req.id=user.id;
        req.role=user.role;
        if(payloadObj) next();
        else{
            req.json({
                msg:"user not verified"
            })
        }
    }else{
        return res.json({
            msg:"operation not allowed"
        })
    }
}

//isAuthorized-? check the user's role
//we will send role key in req obj

module.exports.isAuthorized=function(roles){
    return function(req,res,next){
        let role=req.role;
        if(roles.includes(role)){
            console.log("includes");
            next();
        }else{
            res.status(401).json({
                msg:"operation not allowed"
            })
        }
    }
}
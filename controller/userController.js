const userModel = require("../models/userModel");

module.exports.getUser=async function (req,res){
    try{
        let id=req.id;
        console.log(id);
        let user=await userModel.findById(id);
        res.json( {
            msg:"user retreived",
            user
        })
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
    //get all users from db
    // let allUsers=await userModel.find();
    // let allUsers=await userModel.findOne({name:"Vishal"});
    // res.json({
    //     msg:"users retreived",
    //     allUsers})
    // console.log("getUsers called");
}

// function middleware2(req,res){
// console.log("middleware2");
// }

// module.exports.postUser=function postUser(req,res){
//     console.log(req.body) ;
//     user=req.body;
//     res.json({
//         message:"data received successufully",
//         user:req.body,
//     })
// }

module.exports.updateUser=async function (req,res){
    let id=req.params.id;
    let dataToBeUpdated=req.body;
    // {
    //     name:"Vis"
    //     email:"vis@gmail.com"
    // }
    let user=await userModel.findById(id);
    try{
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);//['name','email']
            }
    
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
    
            const updatedData=await user.save();//iska matlab user jo mangwaya tha usme update kiya hai, ab usko save karle. Jaise ki save as && save karte ,hai word wagerah me 
            res.json({
                message:"data updated succesfully",
            })
        }else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.deleteUser=async function (req,res){ 
    try{
        let id=req.params.id;
        let user=await userModel.findByIdAndDelete(id);
        // let doc=await userModel.findOneAndDelete({email:"sanjay@gmail.com"});
        // console.log(doc);
        res.json({
            message:"user has been deleted",
            user
        })
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.allUsers=async function (req,res){
    try{
        let allUsers = await userModel.find();
        res.json({
          msg: "user id is ",
          allUsers,
        });
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
    // console.log(req.params);
    // // let {id}=req.params;
    // // let user=db.findOne(id);
    // res.send({"msg":"user id is","obj":req.params});
}

// module.exports.setCookies=function (req,res){
//     console.log("set cookies");
//     // res.setHeader('Set-Cookie','isLoggedIn=true');
//     res.cookie('isLoggedIn',false,{maxAge:10000,secure:true});  //The res.cookie() function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON (res.cookie(name, value [, options])).  It returns an Object
//     res.cookie('password',123456,{secure:true});
//     res.send('Cookies are set');
// }

// module.exports.getCookies=function (req,res){
//     let cookies=req.cookies;
//     console.log(cookies);
//     res.send('cookies received');
// }

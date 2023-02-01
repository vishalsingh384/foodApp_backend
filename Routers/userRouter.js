const express= require('express');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,allUsers}=require('../controller/userController');
const {protectRoute,isAuthorized}=require('../helper');
const { application } = require('express');
const {signup,login,forgetpassword,resetpassword,logout}=require('../controller/authController');
// userRouter
//     .route("/")  
//     // .get(middleware1,getUsers,middleware2)
//     .get(protectRoute,getUsers)
//     .post(postUser)
//     .patch(updateUser)
//     .delete(deleteUser)

// userRouter
//     .route('/setCookies')
//     .get(setCookies)

// userRouter
//     .route('/getCookies')
//     .get(getCookies)

// userRouter //dynamic routes should be written at the end
//     .route("/:id")
//     .get(getUserById)

// function middleware1(req,res,next){
//     console.log("middleware1");
//     next();
// }


//user ke option
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/login')
    .post(login)

userRouter
    .route('/signup')
    .post(signup)  
    
userRouter
    .route('/forgetpassword')
    .post(forgetpassword)   
    
userRouter
    .route('/resetpassword/:token')
    .post(resetpassword)     

userRouter
    .route('/logout')
    .post(logout)

//profile page
userRouter.use(protectRoute)
userRouter
    .route('/profile')
    .get(getUser)

//admin specific function
userRouter.use(isAuthorized(['admin']));
userRouter.route('/')
.get(allUsers)    


module.exports=userRouter;